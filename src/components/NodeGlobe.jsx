import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NodeGlobe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const radius = 2;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const light = new THREE.DirectionalLight(0xbfe9ff, 1);
    light.position.set(3, 2, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0x406080, 0.4);
    scene.add(ambient);

    // ===== Base Wireframe (Light Shades) joining point by point =====
    const wireGeom = new THREE.IcosahedronGeometry(radius * 0.99, 4);
    const edgesGeom = new THREE.EdgesGeometry(wireGeom);
    
    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15
    });
    const wireframe = new THREE.LineSegments(edgesGeom, wireMaterial);
    
    const totalWirePoints = edgesGeom.attributes.position.count;
    let currentDrawCount = 0;
    wireframe.geometry.setDrawRange(0, currentDrawCount);
    
    globeGroup.add(wireframe);

    function pointOnSphere(r) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }

    // ===== PARTICLE SHELL =====
    const positions = new Float32Array(7000 * 3);
    for (let i = 0; i < 7000; i++) {
      const p = pointOnSphere(radius);
      const rScale = radius * (0.98 + Math.random() * 0.04);
      positions[i * 3] = p.x * (rScale / radius);
      positions[i * 3 + 1] = p.y * (rScale / radius);
      positions[i * 3 + 2] = p.z * (rScale / radius);
    }

    const particles = new THREE.Points(
      new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(positions, 3)),
      new THREE.PointsMaterial({
        color: 0xd6f5ff,
        size: 0.006,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    globeGroup.add(particles);

    // ===== HOTSPOTS =====
    const hotspots = [];
    function createHotspot() {
      const pos = pointOnSphere(radius);
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pos);

      // Make hotspots a little larger
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      nodeGroup.add(core);

      const rings = [];
      for (let i = 0; i < 2; i++) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.05, 0.09, 32),
          new THREE.MeshBasicMaterial({
            color: 0xbfe9ff,
            transparent: true,
            opacity: 0.35,
            side: THREE.DoubleSide,
            depthWrite: false
          })
        );
        nodeGroup.add(ring);
        rings.push({
          mesh: ring,
          offset: Math.random() * 2,
          speed: 0.4 + Math.random() * 0.2
        });
      }
      globeGroup.add(nodeGroup);
      hotspots.push({ pos, group: nodeGroup, rings });
    }

    // INCREASE AMOUNT OF HIGHLIGHTED DOTS
    for (let i = 0; i < 16; i++) createHotspot();

    // Sort hotspots roughly by longitude so it makes a sequential chain around the globe
    hotspots.sort((a, b) => {
      const angleA = Math.atan2(a.pos.x, a.pos.z);
      const angleB = Math.atan2(b.pos.x, b.pos.z);
      return angleA - angleB;
    });

    // ===== FLOWS =====
    const flows = [];

    function createFlow() {
      if (hotspots.length < 2) return;
      const a = hotspots[Math.floor(Math.random() * hotspots.length)].pos;
      const b = hotspots[Math.floor(Math.random() * hotspots.length)].pos;
      if (a.distanceTo(b) < 1.2) return;

      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(2.8);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const points = curve.getPoints(80);

      const geometry = new THREE.BufferGeometry().setFromPoints([]);
      const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6
      });
      const line = new THREE.Line(geometry, material);
      globeGroup.add(line);

      flows.push({
        points,
        line,
        head: 0,
        tail: 0,
        state: "growing",
        speed: 1.2
      });
    }

    const flowInterval = setInterval(() => {
      if (flows.length < 8) createFlow();
    }, 600);

    let t = 0;
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      t += 0.001;

      globeGroup.rotation.y -= 0.0007;
      globeGroup.rotation.x = Math.sin(t) * 0.15;
      camera.position.z = 6 + Math.sin(t) * 0.3;

      // Animate wireframe joining line by line
      if (currentDrawCount < totalWirePoints) {
        currentDrawCount += 24; 
        wireframe.geometry.setDrawRange(0, currentDrawCount);
      }

      const time = performance.now() * 0.001;
      hotspots.forEach(h => {
        h.rings.forEach(r => {
          const tt = (time * r.speed + r.offset) % 1;
          const eased = tt * tt * (3 - 2 * tt);
          const scale = 1 + eased * 2.2;
          r.mesh.scale.set(scale, scale, scale);
          r.mesh.material.opacity = 0.20 * (1 - eased);
          r.mesh.lookAt(camera.position);
        });
      });

      for (let i = flows.length - 1; i >= 0; i--) {
        const f = flows[i];
        if (f.state === "growing") {
          f.head += f.speed;
          if (f.head >= f.points.length) {
            f.head = f.points.length;
            f.state = "hold";
            f.holdTime = 0;
          }
        } else if (f.state === "hold") {
          f.holdTime++;
          if (f.holdTime > 25) f.state = "shrinking"; // Hold fully connected chain slightly longer
        } else {
          f.tail += f.speed * 0.8; // Shrink away slightly slower
          if (f.tail >= f.points.length) {
            globeGroup.remove(f.line);
            f.line.geometry.dispose();
            f.line.material.dispose();
            flows.splice(i, 1);
            continue;
          }
        }
        const seg = f.points.slice(Math.floor(f.tail), Math.floor(f.head));
        f.line.geometry.setFromPoints(seg);
      }

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(flowInterval);
      cancelAnimationFrame(animationFrameId);
      scene.clear();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

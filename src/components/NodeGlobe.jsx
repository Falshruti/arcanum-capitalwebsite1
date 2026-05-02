import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CONFIG = {
  // ---------- BRANDING ----------
  bgColor:       0x0A1E37,   // scene clear color (navy)
  dotColor:      0xCCD1D9,   // continent dots (light gray, cool tint)
  starColor:     0xFFFFFF,   // starfield

  // Arc palette
  arcColors: [
    0xFFFFFF,
    0xFFFFFF,
    0xFFFFFF,
  ],

  // ---------- GLOBE ----------
  radius:        1.6,
  rotationSpeed: 0.06,
  dotSize:       0.026,
  dotOpacity:    0.95,

  dotDimFrac:     0.45,
  dotMidFrac:     0.37,
  dotBrightFrac:  0.18,
  dotDimOpacity:    0.85,
  dotMidOpacity:    1.00,
  dotBrightOpacity: 1.00,
  dotDimSize:       1.0,
  dotMidSize:       1.15,
  dotBrightSize:    1.35,

  // ---------- GRATICULE (lat/lon grid) ----------
  graticuleColor:   0x0F294A,
  graticuleOpacity: 1.0,
  graticuleStep:    15,
  graticuleRadius:  0.985,
  graticuleSegments: 96,

  // ---------- STARFIELD (subtle) ----------
  starCount:     450,
  starSize:      0.014,
  starMinOpacity: 0.15,
  starMaxOpacity: 0.55,

  // ---------- TRANSACTIONS ----------
  maxActive:     6,
  spawnEveryMin: 0.77,
  spawnEveryMax: 1.86,

  arcLift:       0.75,
  endpointLift:  1.012,
  arcSweepDur:   2.1,
  arcHoldDur:    2.4,
  arcFadeDur:    1.0,

  arcSegments:   220,
  arcTailFrac:   0.3,
  arcLineOpacity: 0.95,
  arcPersistOpacity: 0.45,

  pulseMaxScale: 9,
  pulseDur:      1.9,
  pulseBaseInner: 0.040,
  pulseBaseOuter: 0.052,
  pulseOpacity:   1.0,

  dotMarkerSize: 0.035,
  dotHaloScale:  2.4,
  dotHaloOpacity: 0.28,

  dotStartFadeDur: 0.4,

  dotLiveBreathHz:    1.4,
  dotLiveBreathScale: 0.05,
  dotLiveBreathGlow:  0.10,

  dotDestPopDur:   0.35,
  dotDestFlashDur: 0.5,
  dotDestFlashPeak: 1.6,
  dotDestHaloBloomDur: 0.9,
  dotDestHaloBloomScale: 1.5,
};

const easeOutCubic  = t => 1 - Math.pow(1 - t, 3);
const easeOutQuart  = t => 1 - Math.pow(1 - t, 4);
const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutBack   = t => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const LAND_RECTS = [
  [49, 71, -168, -141], [60, 72, -141,  -95], [49, 60, -130,  -95],
  [42, 60, -123,  -75], [30, 49, -123,  -72], [25, 42, -106,  -80],
  [25, 35, -118,  -95], [25, 32, -100,  -80], [15, 25, -106,  -85],
  [ 7, 20,  -92,  -77], [ 8, 18,  -85,  -77], [60, 78,  -95,  -60],
  [70, 80, -110,  -70], [50, 70,  -95,  -55], [45, 55,  -80,  -55],
  [60, 83,  -55,  -15],
  [ 5, 12,  -77,  -60], [-5, 10,  -80,  -50], [-20,  5,  -80,  -35],
  [-35, -20, -75, -40], [-55, -35, -75, -53], [-35, -20, -65, -50],
  [36, 44,  -10,   45], [44, 55,  -10,   40], [55, 70,    5,   40],
  [55, 71,   10,   60], [36, 47,   12,   42], [35, 43,   20,   45],
  [15, 37,  -17,   35], [ 0, 15,  -17,   50], [-20,  0,   10,   50],
  [-35, -20, 12,   40], [-35, -25, 15,   32],
  [12, 32,   34,   60], [22, 40,   40,   65], [25, 45,   45,   75],
  [30, 50,   50,   80],
  [50, 77,   25,  180], [55, 77,   60,  180],
  [35, 55,   60,  140], [30, 50,   73,  135], [25, 45,   75,  125],
  [ 8, 35,   68,   97], [20, 35,   70,   90], [10, 30,   72,   90],
  [ 5, 25,   90,  108], [ 0, 15,   95,  115],
  [30, 45,  128,  146], [22, 26,  120,  122], [33, 39,  125,  130],
  [ 5, 20,  115,  127], [-10,  6,  95,  141], [-11, -6,  105, 150],
  [-5,  8,  110,  125], [-4,  7,  120,  135],
  [-40, -10, 113, 154], [-47, -34, 166, 179],
  [63, 67,  -24,  -13],
];

function isLand(lat, lon) {
  for (let i = 0; i < LAND_RECTS.length; i++) {
    const r = LAND_RECTS[i];
    if (lat >= r[0] && lat <= r[1] && lon >= r[2] && lon <= r[3]) return true;
  }
  return false;
}

const DEG = Math.PI / 180;

function generateDotData(candidateCount) {
  const dots = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const JITTER  = 0.012;
  const KEEP    = 0.78;

  for (let i = 0; i < candidateCount; i++) {
    const y = 1 - (i / (candidateCount - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    let x = Math.cos(theta) * r;
    let z = Math.sin(theta) * r;
    let yy = y;

    const jx = (Math.random() - 0.5) * 2 * JITTER;
    const jy = (Math.random() - 0.5) * 2 * JITTER;
    const jz = (Math.random() - 0.5) * 2 * JITTER;
    x += jx; yy += jy; z += jz;
    const mag = Math.sqrt(x*x + yy*yy + z*z) || 1;
    x /= mag; yy /= mag; z /= mag;

    const lat = 90 - Math.acos(yy) / DEG;
    const lon = ((Math.atan2(z, x) / DEG) + 360) % 360 - 180;
    if (!isLand(lat, lon)) continue;

    if (Math.random() > KEEP) continue;

    dots.push([x, yy, z]);
  }
  return dots;
}

const DOT_DATA = generateDotData(22000);

function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomLandPoint() {
  const d = DOT_DATA[Math.floor(Math.random() * DOT_DATA.length)];
  return new THREE.Vector3(d[0] * CONFIG.radius, d[1] * CONFIG.radius, d[2] * CONFIG.radius);
}

export default function NodeGlobe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    function buildStarfield() {
      const positions = new Float32Array(CONFIG.starCount * 3);
      const colors    = new Float32Array(CONFIG.starCount * 3);
      const starColorRGB = new THREE.Color(CONFIG.starColor);

      for (let i = 0; i < CONFIG.starCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = 25 + Math.random() * 75;

        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        const depthT = 1 - (r - 25) / 75;
        const bright = CONFIG.starMinOpacity + depthT * (CONFIG.starMaxOpacity - CONFIG.starMinOpacity);
        colors[i * 3]     = starColorRGB.r * bright;
        colors[i * 3 + 1] = starColorRGB.g * bright;
        colors[i * 3 + 2] = starColorRGB.b * bright;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: CONFIG.starSize,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        sizeAttenuation: true,
        depthWrite: false,
      });

      scene.add(new THREE.Points(geo, mat));
    }
    buildStarfield();

    function buildGraticule() {
      const step = CONFIG.graticuleStep;
      const segs = CONFIG.graticuleSegments;
      const R = CONFIG.radius * CONFIG.graticuleRadius;
      const vertices = [];

      for (let lat = -90 + step; lat < 90; lat += step) {
        const phi = (90 - lat) * DEG;
        const ringR = Math.sin(phi);
        const y = Math.cos(phi);
        for (let i = 0; i < segs; i++) {
          const t1 = (i     / segs) * Math.PI * 2;
          const t2 = ((i+1) / segs) * Math.PI * 2;
          vertices.push(
            R * ringR * Math.cos(t1), R * y, R * ringR * Math.sin(t1),
            R * ringR * Math.cos(t2), R * y, R * ringR * Math.sin(t2)
          );
        }
      }

      for (let lon = -180; lon < 180; lon += step) {
        const theta = (lon + 180) * DEG;
        const cosT = Math.cos(theta), sinT = Math.sin(theta);
        for (let i = 0; i < segs; i++) {
          const p1 = (i     / segs) * Math.PI;
          const p2 = ((i+1) / segs) * Math.PI;
          vertices.push(
            -R * Math.sin(p1) * cosT, R * Math.cos(p1), R * Math.sin(p1) * sinT,
            -R * Math.sin(p2) * cosT, R * Math.cos(p2), R * Math.sin(p2) * sinT
          );
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const mat = new THREE.LineBasicMaterial({
        color: CONFIG.graticuleColor,
        transparent: true,
        opacity: CONFIG.graticuleOpacity,
        depthWrite: false,
      });

      globeGroup.add(new THREE.LineSegments(geo, mat));
    }
    buildGraticule();

    function buildGlobeDots() {
      const N = DOT_DATA.length;
      const positions = new Float32Array(N * 3);
      const aSize     = new Float32Array(N);
      const aAlpha    = new Float32Array(N);

      const rand = mulberry32(0xA7C6B31D);

      const t1 = CONFIG.dotDimFrac;
      const t2 = t1 + CONFIG.dotMidFrac;

      for (let i = 0; i < N; i++) {
        positions[i * 3]     = DOT_DATA[i][0] * CONFIG.radius;
        positions[i * 3 + 1] = DOT_DATA[i][1] * CONFIG.radius;
        positions[i * 3 + 2] = DOT_DATA[i][2] * CONFIG.radius;

        const r = rand();
        let sizeMul, alpha;
        if (r < t1) {
          sizeMul = CONFIG.dotDimSize;    alpha = CONFIG.dotDimOpacity;
        } else if (r < t2) {
          sizeMul = CONFIG.dotMidSize;    alpha = CONFIG.dotMidOpacity;
        } else {
          sizeMul = CONFIG.dotBrightSize; alpha = CONFIG.dotBrightOpacity;
        }
        aSize[i]  = sizeMul * (0.95 + rand() * 0.1);
        aAlpha[i] = alpha   * (0.95 + rand() * 0.1);
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('aSize',    new THREE.BufferAttribute(aSize, 1));
      geo.setAttribute('aAlpha',   new THREE.BufferAttribute(aAlpha, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(CONFIG.dotColor) },
          uSize:  { value: CONFIG.dotSize * 300 },
          uOpacityMul: { value: CONFIG.dotOpacity },
        },
        vertexShader: `
          attribute float aSize;
          attribute float aAlpha;
          uniform float uSize;
          varying float vAlpha;
          void main() {
            vAlpha = aAlpha;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = uSize * aSize / -mvPosition.z;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacityMul;
          varying float vAlpha;
          void main() {
            vec2 c = gl_PointCoord - vec2(0.5);
            if (dot(c, c) > 0.25) discard;
            gl_FragColor = vec4(uColor, vAlpha * uOpacityMul);
          }
        `,
        transparent: true,
        depthWrite: false,
      });

      globeGroup.add(new THREE.Points(geo, mat));
    }
    buildGlobeDots();

    class Transaction {
      constructor(startVec, endVec) {
        this.start = startVec.clone().multiplyScalar(CONFIG.endpointLift);
        this.end   = endVec.clone().multiplyScalar(CONFIG.endpointLift);
        this.color = new THREE.Color(CONFIG.arcColors[Math.floor(Math.random() * CONFIG.arcColors.length)]);

        const mid = this.start.clone().add(this.end).multiplyScalar(0.5)
                      .normalize()
                      .multiplyScalar(CONFIG.radius + CONFIG.arcLift);
        this.curve = new THREE.QuadraticBezierCurve3(this.start, mid, this.end);

        this.N = CONFIG.arcSegments;
        this.samplePoints = this.curve.getPoints(this.N);

        const positions = new Float32Array((this.N + 1) * 3);
        const colors    = new Float32Array((this.N + 1) * 3);
        for (let i = 0; i <= this.N; i++) {
          positions[i * 3]     = this.samplePoints[i].x;
          positions[i * 3 + 1] = this.samplePoints[i].y;
          positions[i * 3 + 2] = this.samplePoints[i].z;
          colors[i * 3]     = this.color.r;
          colors[i * 3 + 1] = this.color.g;
          colors[i * 3 + 2] = this.color.b;
        }

        this.geo = new THREE.BufferGeometry();
        this.geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
        this.geo.setDrawRange(0, 0);

        this._headVec = new THREE.Vector3();
        this._dirtyIdx = -1;

        this.mat = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 1,
          depthWrite: false,
        });
        this.line = new THREE.Line(this.geo, this.mat);
        globeGroup.add(this.line);

        const startN = this.start.clone().normalize();
        const endN   = this.end.clone().normalize();
        const angle  = Math.acos(Math.min(1, Math.max(-1, startN.dot(endN))));
        const distT  = angle / Math.PI;
        this.distScale = 0.15 + distT * 0.6;

        this.startDot = this._makeDot(this.start, 'start');
        this.endDot   = this._makeDot(this.end,   'dest');
        this.startDot.userData.active = true;

        this.pulses = [];
        this._spawnPulse(this.start, 0, this.distScale);

        this.time = 0;
        this.totalDur = CONFIG.arcSweepDur + CONFIG.arcHoldDur + CONFIG.arcFadeDur;
        this.destPulsesFired = false;
      }

      _makeDot(pos, role) {
        const group = new THREE.Group();
        group.position.copy(pos);
        group.renderOrder = 5;

        const baseSize = CONFIG.dotMarkerSize * (0.8 + this.distScale * 0.6);

        const core = new THREE.Mesh(
          new THREE.SphereGeometry(baseSize, 16, 16),
          new THREE.MeshBasicMaterial({
            color: this.color,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          })
        );
        core.renderOrder = 6;
        const halo = new THREE.Mesh(
          new THREE.SphereGeometry(baseSize * CONFIG.dotHaloScale, 16, 16),
          new THREE.MeshBasicMaterial({
            color: this.color,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          })
        );
        halo.renderOrder = 5;

        group.add(halo);
        group.add(core);

        group.userData = {
          role,
          core,
          halo,
          elapsed: 0,
          active: false,
          live: false,
          phase: Math.random() * Math.PI * 2,
        };
        group.scale.set(1, 1, 1);

        globeGroup.add(group);
        return group;
      }

      _updateDot(dot, dt) {
        const ud = dot.userData;
        if (!ud.active) return;
        ud.elapsed += dt;

        let coreOpacity, haloOpacity;

        if (ud.role === 'start') {
          const t = Math.min(1, ud.elapsed / CONFIG.dotStartFadeDur);
          const eased = easeOutCubic(t);
          coreOpacity = eased;
          haloOpacity = eased * CONFIG.dotHaloOpacity;

          if (ud.live) {
            const b = Math.sin(ud.elapsed * CONFIG.dotLiveBreathHz * Math.PI * 2 + ud.phase);
            const s = 1 + b * CONFIG.dotLiveBreathScale;
            dot.scale.set(s, s, s);
            haloOpacity *= 1 + b * CONFIG.dotLiveBreathGlow;
          } else {
            dot.scale.set(1, 1, 1);
          }
        } else {
          const popT  = Math.min(1, ud.elapsed / CONFIG.dotDestPopDur);
          const popScale = easeOutBack(popT);
          dot.scale.set(popScale, popScale, popScale);

          const flashT = Math.min(1, ud.elapsed / CONFIG.dotDestFlashDur);
          let flash;
          if (flashT < 0.3) flash = 1 + (CONFIG.dotDestFlashPeak - 1) * (flashT / 0.3);
          else              flash = CONFIG.dotDestFlashPeak - (CONFIG.dotDestFlashPeak - 1) * ((flashT - 0.3) / 0.7);
          coreOpacity = flash;

          const bloomT = Math.min(1, ud.elapsed / CONFIG.dotDestHaloBloomDur);
          const haloScale = bloomT < 0.4
            ? 1 + (CONFIG.dotDestHaloBloomScale - 1) * (bloomT / 0.4)
            : CONFIG.dotDestHaloBloomScale - (CONFIG.dotDestHaloBloomScale - 1) * ((bloomT - 0.4) / 0.6);
          ud.halo.scale.set(haloScale, haloScale, haloScale);
          const bloomEased = easeOutCubic(bloomT);
          haloOpacity = CONFIG.dotHaloOpacity * (1 + (1 - bloomEased) * 0.8);
        }

        const fadeMul = ud.fadeMul != null ? ud.fadeMul : 1;
        ud.core.material.opacity = coreOpacity * fadeMul;
        ud.halo.material.opacity = haloOpacity * fadeMul;
      }

      _spawnPulse(pos, delay, sizeMult = 1) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(CONFIG.pulseBaseInner * sizeMult, CONFIG.pulseBaseOuter * sizeMult, 64),
          new THREE.MeshBasicMaterial({
            color: this.color,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            depthWrite: false,
          })
        );
        ring.position.copy(pos);
        ring.lookAt(0, 0, 0);
        globeGroup.add(ring);
        this.pulses.push({ ring, delay, elapsed: 0, dead: false });
      }

      _updatePulses(dt) {
        for (const p of this.pulses) {
          if (p.dead) continue;
          if (p.delay > 0) { p.delay -= dt; continue; }
          p.elapsed += dt;
          const t = Math.min(1, p.elapsed / CONFIG.pulseDur);
          const eased = easeOutCubic(t);
          const scale = 1 + eased * (CONFIG.pulseMaxScale - 1);
          p.ring.scale.set(scale, scale, scale);
          const decay = 1 - eased;
          const tailFade = t > 0.85 ? (1 - (t - 0.85) / 0.15) : 1;
          p.ring.material.opacity = decay * tailFade * CONFIG.pulseOpacity;
          if (t >= 1) {
            p.dead = true;
            globeGroup.remove(p.ring);
            p.ring.geometry.dispose();
            p.ring.material.dispose();
          }
        }
      }

      update(dt) {
        this.time += dt;

        const isLive = this.time < CONFIG.arcSweepDur;
        this.startDot.userData.live = isLive;
        this.endDot.userData.live = false;

        if (this.time < CONFIG.arcSweepDur) {
          const rawT = this.time / CONFIG.arcSweepDur;
          const t = easeOutCubic(rawT);

          const floatIdx = t * this.N;
          const lastWholeIdx = Math.floor(floatIdx);
          const nextIdx = Math.min(this.N, lastWholeIdx + 1);

          const pos = this.geo.attributes.position.array;

          if (this._dirtyIdx >= 0 && this._dirtyIdx !== nextIdx) {
            const di = this._dirtyIdx;
            pos[di * 3]     = this.samplePoints[di].x;
            pos[di * 3 + 1] = this.samplePoints[di].y;
            pos[di * 3 + 2] = this.samplePoints[di].z;
          }

          this.curve.getPoint(t, this._headVec);
          pos[nextIdx * 3]     = this._headVec.x;
          pos[nextIdx * 3 + 1] = this._headVec.y;
          pos[nextIdx * 3 + 2] = this._headVec.z;
          this.geo.attributes.position.needsUpdate = true;
          this._dirtyIdx = nextIdx;

          this.geo.setDrawRange(0, nextIdx + 1);
          this.mat.opacity = CONFIG.arcLineOpacity;
        }
        else if (this.time < CONFIG.arcSweepDur + CONFIG.arcHoldDur) {
          if (!this.destPulsesFired) {
            if (this._dirtyIdx >= 0) {
              const pos = this.geo.attributes.position.array;
              const di = this._dirtyIdx;
              pos[di * 3]     = this.samplePoints[di].x;
              pos[di * 3 + 1] = this.samplePoints[di].y;
              pos[di * 3 + 2] = this.samplePoints[di].z;
              this.geo.attributes.position.needsUpdate = true;
              this._dirtyIdx = -1;
            }
            this.endDot.userData.active = true;
            this._spawnPulse(this.end, 0, this.distScale);
            this.destPulsesFired = true;
          }
          const holdT = this.time - CONFIG.arcSweepDur;
          const blend = Math.min(1, holdT / 0.25);
          this.geo.setDrawRange(0, this.N + 1);
          this.mat.opacity = CONFIG.arcLineOpacity +
                             (CONFIG.arcPersistOpacity - CONFIG.arcLineOpacity) * blend;
        }
        else {
          const phaseT = (this.time - CONFIG.arcSweepDur - CONFIG.arcHoldDur) / CONFIG.arcFadeDur;
          const fade = 1 - easeInOutCubic(Math.min(1, phaseT));
          this.mat.opacity = CONFIG.arcPersistOpacity * fade;
          this.startDot.userData.fadeMul = fade;
          this.endDot.userData.fadeMul   = fade;
        }

        this._updateDot(this.startDot, dt);
        this._updateDot(this.endDot, dt);

        this._updatePulses(dt);
      }

      dispose() {
        globeGroup.remove(this.line);
        globeGroup.remove(this.startDot);
        globeGroup.remove(this.endDot);
        this.geo.dispose();
        this.mat.dispose();
        for (const dot of [this.startDot, this.endDot]) {
          dot.userData.core.geometry.dispose();
          dot.userData.core.material.dispose();
          dot.userData.halo.geometry.dispose();
          dot.userData.halo.material.dispose();
        }
        for (const p of this.pulses) {
          if (!p.dead) {
            globeGroup.remove(p.ring);
            p.ring.geometry.dispose();
            p.ring.material.dispose();
          }
        }
      }

      done() { return this.time >= this.totalDur; }
    }

    const transactions = [];
    let spawnCountdown = 0.3;
    const clock = new THREE.Clock();

    function spawnTransaction() {
      let a = randomLandPoint();
      let b = randomLandPoint();
      let tries = 0;
      while (a.distanceTo(b) < CONFIG.radius * 1.8 && tries < 40) {
        b = randomLandPoint();
        tries++;
      }
      transactions.push(new Transaction(a, b));
    }

    let spawnTimeouts = [];
    spawnTransaction();
    spawnTimeouts.push(setTimeout(spawnTransaction, 400));
    spawnTimeouts.push(setTimeout(spawnTransaction, 900));

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min(clock.getDelta(), 0.1);

      globeGroup.rotation.y += CONFIG.rotationSpeed * dt;

      spawnCountdown -= dt;
      if (spawnCountdown <= 0 && transactions.length < CONFIG.maxActive) {
        spawnTransaction();
        spawnCountdown = CONFIG.spawnEveryMin +
                         Math.random() * (CONFIG.spawnEveryMax - CONFIG.spawnEveryMin);
      }

      for (let i = transactions.length - 1; i >= 0; i--) {
        transactions[i].update(dt);
        if (transactions[i].done()) {
          transactions[i].dispose();
          transactions.splice(i, 1);
        }
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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      spawnTimeouts.forEach(clearTimeout);
      
      for (const t of transactions) {
        t.dispose();
      }

      scene.clear();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

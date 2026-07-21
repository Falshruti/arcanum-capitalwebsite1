import React, { useEffect, useRef } from 'react';
import './VennDiagram.css';

/* ─────────────────────────────────────────────────────────────
   Arcanum Thesis Explorer – scroll-animated Venn diagram
   Faithfully ported from the standalone HTML reference.
───────────────────────────────────────────────────────────── */

const PANEL_DATA = [
  {
    id: 0,
    headline: 'Three systems are converging.',
    body: 'Financial infrastructure, decentralized rails, and intelligent systems are reshaping how value moves.',
    topics: [],
    topicsEmpty: true,
  },
  {
    id: 1,
    headline: 'Stablecoins are becoming financial infrastructure.',
    body: 'Programmable settlement rails are moving beyond crypto-native use cases and into the operating layer of global finance.',
    topics: [
      'Stablecoin infrastructure',
      'Onchain treasury & reserves',
      'Tokenized real-world assets',
      'Cross-border settlement',
    ],
  },
  {
    id: 2,
    headline: 'Intelligence is moving into the financial stack.',
    body: 'Models, agents, and decision systems are beginning to reshape financial products, workflows, and risk infrastructure.',
    topics: [
      'Financial AI',
      'Autonomous agents & workflows',
      'AI-native risk & fraud detection',
      'Data infrastructure & models',
    ],
  },
  {
    id: 3,
    headline: 'Machines are becoming economic actors.',
    body: 'Autonomous systems need programmable value rails to transact, settle, and coordinate without traditional payment friction.',
    topics: [
      'Autonomous agents',
      'Programmable settlement',
      'Machine-to-machine payments',
      'Onchain coordination',
    ],
  },
  {
    id: 4,
    headline: 'We invest at the point of convergence.',
    body: 'Arcanum backs the infrastructure, applications, and protocols emerging as financial systems become programmable, decentralized, and intelligent.',
    topics: [
      'Early-stage infrastructure',
      'Global financial rails',
      'Intelligent financial systems',
      'Category-defining protocols',
    ],
  },
];

export default function VennDiagram() {
  /* ── Refs to DOM nodes the animation loop writes to directly ── */
  const explorerRef     = useRef(null);
  const canvasRef       = useRef(null);
  const panelRefs       = useRef([]);
  const ringRefs        = useRef([]);
  const innerRingRefs   = useRef([]);
  const pairRefs        = useRef([]);
  const domainRefs      = useRef([]);
  const zoneRefs        = useRef([]);
  const tripleRef       = useRef(null);
  const progressBarRef  = useRef(null);
  const scrollHintRef   = useRef(null);

  useEffect(() => {
    const explorer    = explorerRef.current;
    const canvas      = canvasRef.current;
    if (!explorer || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Pure helpers ─────────────────────────────────────────── */
    const clamp  = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
    const mix    = (a, b, t) => a + (b - a) * t;
    const smooth = t => { t = clamp(t); return t * t * (3 - 2 * t); };

    /* ── Particle config ──────────────────────────────────────── */
    const C = {
      dotRGB:  [204, 209, 217],
      starRGB: [255, 255, 255],

      microEdgeCount:   236,
      microEdgeSize:    .46,
      microEdgeOpacity: .24,

      candidateCount:  292,
      keepFraction:    .78,
      angularJitter:   .0030,
      radialJitter:    .48,
      perimeterDrift:  reduceMotion ? 0 : .0046,

      dustCandidateCount: 4200,
      dustKeepFraction:   .34,

      dotDimFrac:     .45,
      dotMidFrac:     .37,
      dotBrightFrac:  .18,
      dotDimOpacity:  .78,
      dotMidOpacity:  .96,
      dotBrightOpacity: 1,
      dotDimSize:     .82,
      dotMidSize:     1.03,
      dotBrightSize:  1.32,
      dotBaseSize:    .92,

      edgeMinStrength:  .38,
      heroHaloOpacity:  .14,
      heroHaloScale:    2.15,
      glintStrength:    .24,
      glintWidth:       .20,
      glintSpeed:       .22,
    };

    const easeOutCubic = t => 1 - Math.pow(1 - clamp(t), 3);

    function mulberry32(seed) {
      return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function shortestAngle(a, b) {
      return Math.atan2(Math.sin(a - b), Math.cos(a - b));
    }

    /* ── Stage definitions ───────────────────────────────────── */
    const stages = [
      { fields: [.62, .62, .62], pairs: [0, 0, 0],     zones: [0, 0, 0, 0], triple: 0   },
      { fields: [1, 1, .32],     pairs: [1, 0, 0],     zones: [1, 0, 0, 0], triple: 0   },
      { fields: [1, .32, 1],     pairs: [0, 1, 0],     zones: [0, 1, 0, 0], triple: 0   },
      { fields: [.32, 1, 1],     pairs: [0, 0, 1],     zones: [0, 0, 1, 0], triple: 0   },
      { fields: [.84, .84, .84], pairs: [.24, .24, .24], zones: [0, 0, 0, 1], triple: .62 },
    ];

    /* ── View state ──────────────────────────────────────────── */
    const VIEWBOX_W = 760;
    const VIEWBOX_H = 730;
    const VIEWBOX_Y = -30; // viewBox y-origin offset
    let w = 0, h = 0, dpr = 1;
    let viewScale = 1, viewOffsetX = 0, viewOffsetY = 0;
    let progress = 0, targetProgress = 0, scrollable = 1;
    let visible = true;
    let lastTime = performance.now(), time = 0;
    let rafId = null;

    /* ── Overlay label positioning ───────────────────────────── */
    const overlayLabels = explorer.querySelectorAll('[data-vx][data-vy]');

    const mapPoint = (x, y) => ({
      x: viewOffsetX + x * viewScale,
      y: viewOffsetY + (y - VIEWBOX_Y) * viewScale,
    });

    function positionOverlayLabels() {
      overlayLabels.forEach(el => {
        const p = mapPoint(Number(el.dataset.vx), Number(el.dataset.vy));
        el.style.left = `${p.x.toFixed(2)}px`;
        el.style.top  = `${p.y.toFixed(2)}px`;
      });
    }

    /* ── Geometry ────────────────────────────────────────────── */
    const fieldGeometry = [
      { id: 0, x: 380, y: 220, r: 190, phase: .25  },
      { id: 1, x: 255, y: 455, r: 190, phase: 2.15 },
      { id: 2, x: 505, y: 455, r: 190, phase: 4.05 },
    ];

    /* ── Build particle arrays (once) ────────────────────────── */
    const ringParticles = [];
    fieldGeometry.forEach(field => {
      const rand = mulberry32(0xA7C6B31D + field.id * 0x1F123BB5);
      const t1 = C.dotDimFrac;
      const t2 = t1 + C.dotMidFrac;

      for (let i = 0; i < C.candidateCount; i++) {
        if (rand() > C.keepFraction) continue;
        const tierRoll = rand();
        let sizeMul, opacity, hero = false;
        if (tierRoll < t1) {
          sizeMul = C.dotDimSize; opacity = C.dotDimOpacity;
        } else if (tierRoll < t2) {
          sizeMul = C.dotMidSize; opacity = C.dotMidOpacity;
        } else {
          sizeMul = C.dotBrightSize; opacity = C.dotBrightOpacity; hero = true;
        }
        const baseAngle    = (i / C.candidateCount) * Math.PI * 2;
        const angleJitter  = (rand() - .5) * 2 * C.angularJitter;
        const radialJitter = (rand() - .5) * 2 * C.radialJitter;
        ringParticles.push({
          field: field.id,
          a: baseAngle + angleJitter,
          radialJitter,
          size: C.dotBaseSize * sizeMul * (.95 + rand() * .10),
          opacity: opacity * (.95 + rand() * .10),
          drift: .82 + rand() * .34,
          hero,
          glintPhase: rand() * Math.PI * 2,
        });
      }
    });

    const microEdgeDots = [];
    fieldGeometry.forEach(field => {
      const rand = mulberry32(0x7A11C0DE + field.id * 0x00BADC0D);
      for (let i = 0; i < C.microEdgeCount; i++) {
        microEdgeDots.push({
          field: field.id,
          a: (i / C.microEdgeCount) * Math.PI * 2,
          opacity: C.microEdgeOpacity * (.86 + rand() * .28),
          size:    C.microEdgeSize    * (.92 + rand() * .16),
        });
      }
    });

    const fieldDust = [];
    {
      const rand = mulberry32(0x51A7F13D);
      for (let i = 0; i < C.dustCandidateCount; i++) {
        if (rand() > C.dustKeepFraction) continue;
        const x = rand() * VIEWBOX_W;
        const y = rand() * VIEWBOX_H;
        const memberships = [];
        fieldGeometry.forEach((f, idx) => {
          const dx = x - f.x, dy = y - f.y;
          if (dx * dx + dy * dy < f.r * f.r) memberships.push(idx);
        });
        if (!memberships.length) continue;
        fieldDust.push({
          x, y, memberships,
          size:  (memberships.length === 3 ? .58 : .38) * (.86 + rand() * .28),
          phase: rand() * Math.PI * 2,
          drift: .65 + rand() * .7,
        });
      }
    }

    /* ── Resize / measure ────────────────────────────────────── */
    function measure() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled  = true;
      ctx.imageSmoothingQuality  = 'high';

      viewScale   = Math.min(w / VIEWBOX_W, h / VIEWBOX_H);
      viewOffsetX = (w - VIEWBOX_W * viewScale) / 2;
      viewOffsetY = (h - VIEWBOX_H * viewScale) / 2;
      positionOverlayLabels();

      scrollable = Math.max(1, explorer.offsetHeight - innerHeight);
      readScroll();
    }

    function readScroll() {
      const rect   = explorer.getBoundingClientRect();
      const passed = clamp(-rect.top, 0, scrollable);
      targetProgress = passed / scrollable;
    }

    /* ── Timeline / stage interpolation ─────────────────────── */
    function getTimeline(p) {
      const u       = clamp(p) * 5;
      const segment = Math.min(4, Math.floor(u));
      const frac    = segment === 4 ? 0 : u - segment;

      if (segment === 4 || frac < .72) {
        return { from: segment, to: segment, blend: 0, stageFloat: segment };
      }
      const blend = smooth((frac - .72) / .28);
      return { from: segment, to: Math.min(4, segment + 1), blend, stageFloat: segment + blend };
    }

    function sampleStage(timeline) {
      const a = stages[timeline.from];
      const b = stages[timeline.to];
      const t = timeline.blend;
      return {
        fields: a.fields.map((v, i) => mix(v, b.fields[i], t)),
        pairs:  a.pairs.map((v, i)  => mix(v, b.pairs[i],  t)),
        zones:  a.zones.map((v, i)  => mix(v, b.zones[i],  t)),
        triple: mix(a.triple, b.triple, t),
      };
    }

    /* ── DOM rendering (panels + SVG elements) ───────────────── */
    function renderDOM(timeline) {
      const state = sampleStage(timeline);

      /* panels */
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        let opacity = 0, y = 22;
        if (timeline.from === timeline.to) {
          if (i === timeline.from) { opacity = 1; y = 0; }
        } else if (i === timeline.from) {
          opacity = timeline.blend < .45 ? 1 - smooth(timeline.blend / .45) : 0;
          y = -14 * smooth(clamp(timeline.blend / .45));
        } else if (i === timeline.to) {
          opacity = timeline.blend > .55 ? smooth((timeline.blend - .55) / .45) : 0;
          y = 14 * (1 - smooth(clamp((timeline.blend - .55) / .45)));
        }
        panel.style.opacity        = opacity.toFixed(3);
        panel.style.transform      = `translate3d(0,${y.toFixed(2)}px,0)`;
        panel.style.pointerEvents  = opacity > .8 ? 'auto' : 'none';
        panel.setAttribute('aria-hidden', opacity > .12 ? 'false' : 'true');
      });

      /* rings */
      state.fields.forEach((intensity, i) => {
        const ring   = ringRefs.current[i];
        const inner  = innerRingRefs.current[i];
        const domain = domainRefs.current[i];
        if (!ring || !inner || !domain) return;
        ring.style.opacity  = Math.max(.28, intensity).toFixed(3);
        ring.style.filter   = `drop-shadow(0 0 ${mix(0, 7, intensity).toFixed(1)}px rgba(255,255,255,${mix(0, .012, intensity).toFixed(3)}))`;
        ring.style.stroke   = 'none';
        ring.style.fill     = `rgba(15,41,74,${mix(.07, .16, intensity).toFixed(3)})`;
        inner.style.opacity = 0;
        domain.style.opacity = mix(.48, 1, intensity).toFixed(3);
        domain.style.color   = intensity > .72 ? '#FFFFFF' : '#9fa9b8';
      });

      /* pairs */
      state.pairs.forEach((opacity, i) => {
        if (pairRefs.current[i]) pairRefs.current[i].style.opacity = opacity.toFixed(3);
      });

      /* zones */
      state.zones.forEach((opacity, i) => {
        const zone = zoneRefs.current[i];
        if (!zone) return;
        zone.style.opacity = opacity.toFixed(3);
        zone.style.color   = opacity > .75 ? '#f2f4f8' : '#cbd2de';
        const scale = i === 3 ? mix(.975, 1, opacity) : 1;
        zone.style.transform = `translate(-50%,-50%) scale(${scale.toFixed(3)})`;
      });

      /* triple */
      if (tripleRef.current) tripleRef.current.style.opacity = state.triple.toFixed(3);

      /* progress + scroll hint */
      if (progressBarRef.current)
        progressBarRef.current.style.width = `${(progress * 100).toFixed(2)}%`;
      if (scrollHintRef.current)
        scrollHintRef.current.style.opacity = clamp(1 - progress * 10).toFixed(3);

      return state;
    }

    /* ── Canvas drawing ──────────────────────────────────────── */
    function drawParticles(state) {
      ctx.clearRect(0, 0, w, h);

      const mapped = fieldGeometry.map(f => {
        const p = mapPoint(f.x, f.y);
        return { ...f, px: p.x, py: p.y, pr: f.r * viewScale };
      });

      /* micro-edge dots */
      for (const p of microEdgeDots) {
        const f = mapped[p.field];
        const intensity   = state.fields[p.field];
        const edgeStrength = mix(C.edgeMinStrength, 1, intensity);
        const angle = p.a + time * C.perimeterDrift * .45;
        const x = f.px + Math.cos(angle) * f.pr;
        const y = f.py + Math.sin(angle) * f.pr;
        const alpha = clamp(p.opacity * edgeStrength);
        ctx.fillStyle = `rgba(${C.dotRGB[0]},${C.dotRGB[1]},${C.dotRGB[2]},${alpha.toFixed(4)})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      /* constellation ring particles */
      for (const p of ringParticles) {
        const f = mapped[p.field];
        const intensity    = state.fields[p.field];
        const edgeStrength = mix(C.edgeMinStrength, 1, intensity);
        const angle  = p.a + time * C.perimeterDrift * p.drift;
        const radius = f.pr + p.radialJitter;
        const x = f.px + Math.cos(angle) * radius;
        const y = f.py + Math.sin(angle) * radius;

        const glintHead = time * C.glintSpeed + f.phase + p.glintPhase * .04;
        const glintDist = Math.abs(shortestAngle(angle, glintHead));
        const glint     = Math.exp(-(glintDist * glintDist) / (C.glintWidth * C.glintWidth));
        const glintMul  = 1 + glint * C.glintStrength * intensity;

        const alpha = clamp(p.opacity * edgeStrength * glintMul);
        const size  = p.size * (1 + glint * .08 * intensity);

        if (p.hero) {
          const haloAlpha = alpha * C.heroHaloOpacity;
          ctx.fillStyle = `rgba(${C.starRGB[0]},${C.starRGB[1]},${C.starRGB[2]},${haloAlpha.toFixed(4)})`;
          ctx.beginPath();
          ctx.arc(x, y, size * C.heroHaloScale, 0, Math.PI * 2);
          ctx.fill();
        }

        const rgb = p.hero ? C.starRGB : C.dotRGB;
        ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha.toFixed(4)})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      /* field dust */
      for (const p of fieldDust) {
        const fieldStrength = p.memberships.reduce((s, i) => s + state.fields[i], 0) / p.memberships.length;
        const overlapBoost  = p.memberships.length === 3 ? 1.9 : p.memberships.length === 2 ? 1.3 : 1;
        const alpha  = .013 * fieldStrength * overlapBoost;
        const base   = mapPoint(p.x, p.y);
        const x = base.x + Math.sin(time * .11 * p.drift + p.phase) * .28;
        const y = base.y + Math.cos(time * .10 * p.drift + p.phase) * .28;
        ctx.fillStyle = `rgba(${C.dotRGB[0]},${C.dotRGB[1]},${C.dotRGB[2]},${alpha.toFixed(4)})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      /* convergence trails */
      if (state.triple > .02) {
        const target = mapPoint(380, 372);
        mapped.forEach((source, fi) => {
          for (let i = 0; i < 8; i++) {
            const p = (time * .035 + i / 8 + fi * .17) % 1;
            const e = easeOutCubic(p);
            const x = source.px + (target.x - source.px) * e;
            const y = source.py + (target.y - source.py) * e;
            const alpha = Math.sin(p * Math.PI) * .20 * state.triple;
            ctx.fillStyle = `rgba(${C.starRGB[0]},${C.starRGB[1]},${C.starRGB[2]},${alpha.toFixed(4)})`;
            ctx.beginPath();
            ctx.arc(x, y, .72, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }
    }

    /* ── Animation loop ──────────────────────────────────────── */
    function frame(now) {
      const dt = Math.min(.05, (now - lastTime) / 1000);
      lastTime = now;
      if (!reduceMotion) time += dt;

      const follow = 1 - Math.exp(-dt * 10.5);
      progress += (targetProgress - progress) * follow;

      const timeline = getTimeline(progress);
      const state    = renderDOM(timeline);
      if (visible) drawParticles(state);

      rafId = requestAnimationFrame(frame);
    }

    /* ── Intersection observer ───────────────────────────────── */
    const observer = new IntersectionObserver(
      entries => { visible = entries[0]?.isIntersecting ?? true; },
      { rootMargin: '150px' }
    );
    observer.observe(explorer);

    /* ── Bootstrap ───────────────────────────────────────────── */
    const ro = new ResizeObserver(measure);
    ro.observe(canvas);

    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', measure,    { passive: true });

    measure();
    readScroll();
    progress = targetProgress;
    rafId = requestAnimationFrame(frame);

    /* ── Cleanup ─────────────────────────────────────────────── */
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section className="explorer" id="explorer" ref={explorerRef}>
      <div className="explorer-sticky">
        <div className="explorer-shell">

          {/* ── Left: text copy ───────────────────────────── */}
          <div className="explorer-copy">
            {PANEL_DATA.map((panel, i) => (
              <article
                key={panel.id}
                className="explorer-panel"
                data-panel={panel.id}
                ref={el => (panelRefs.current[i] = el)}
              >
                <h2>{panel.headline}</h2>
                <p>{panel.body}</p>
                <ol className={`explorer-topics${panel.topicsEmpty ? ' explorer-topics--empty' : ''}`}
                    aria-hidden={panel.topicsEmpty ? 'true' : undefined}>
                  {panel.topics.map((topic, ti) => (
                    <li key={ti}>{topic}</li>
                  ))}
                </ol>
              </article>
            ))}

            <div className="explorer-progress">
              <div className="explorer-progress__track" aria-hidden="true">
                <div className="explorer-progress__bar" ref={progressBarRef} />
              </div>
            </div>
          </div>

          {/* ── Right: visual ─────────────────────────────── */}
          <div className="explorer-visual" id="venn-visual">
            <canvas id="venn-particles" ref={canvasRef} aria-hidden="true" />

            <svg
              className="explorer-diagram"
              viewBox="0 -30 760 730"
              role="img"
              aria-label="FinTech, Blockchain and AI convergence field"
            >
              <defs>
                <clipPath id="vclipA"><circle cx="380" cy="220" r="190"/></clipPath>
                <clipPath id="vclipB"><circle cx="255" cy="455" r="190"/></clipPath>
                <clipPath id="vclipC"><circle cx="505" cy="455" r="190"/></clipPath>
                <mask id="vexcludeA" maskUnits="userSpaceOnUse" x="0" y="0" width="760" height="700">
                  <rect width="760" height="700" fill="white"/>
                  <circle cx="380" cy="220" r="190" fill="black"/>
                </mask>
                <mask id="vexcludeB" maskUnits="userSpaceOnUse" x="0" y="0" width="760" height="700">
                  <rect width="760" height="700" fill="white"/>
                  <circle cx="255" cy="455" r="190" fill="black"/>
                </mask>
                <mask id="vexcludeC" maskUnits="userSpaceOnUse" x="0" y="0" width="760" height="700">
                  <rect width="760" height="700" fill="white"/>
                  <circle cx="505" cy="455" r="190" fill="black"/>
                </mask>
              </defs>

              <circle className="venn-inner-ring" data-inner="0" cx="380" cy="220" r="165"
                ref={el => (innerRingRefs.current[0] = el)} />
              <circle className="venn-inner-ring" data-inner="1" cx="255" cy="455" r="165"
                ref={el => (innerRingRefs.current[1] = el)} />
              <circle className="venn-inner-ring" data-inner="2" cx="505" cy="455" r="165"
                ref={el => (innerRingRefs.current[2] = el)} />

              <circle className="venn-ring" data-ring="0" cx="380" cy="220" r="190"
                ref={el => (ringRefs.current[0] = el)} />
              <circle className="venn-ring" data-ring="1" cx="255" cy="455" r="190"
                ref={el => (ringRefs.current[1] = el)} />
              <circle className="venn-ring" data-ring="2" cx="505" cy="455" r="190"
                ref={el => (ringRefs.current[2] = el)} />

              <g clipPath="url(#vclipA)" mask="url(#vexcludeC)">
                <circle className="venn-pair" data-pair="0" cx="255" cy="455" r="190"
                  ref={el => (pairRefs.current[0] = el)} />
              </g>
              <g clipPath="url(#vclipA)" mask="url(#vexcludeB)">
                <circle className="venn-pair" data-pair="1" cx="505" cy="455" r="190"
                  ref={el => (pairRefs.current[1] = el)} />
              </g>
              <g clipPath="url(#vclipB)" mask="url(#vexcludeA)">
                <circle className="venn-pair" data-pair="2" cx="505" cy="455" r="190"
                  ref={el => (pairRefs.current[2] = el)} />
              </g>

              <g clipPath="url(#vclipA)">
                <g clipPath="url(#vclipB)">
                  <circle className="venn-triple" id="venn-triple" cx="505" cy="455" r="190"
                    ref={tripleRef} />
                </g>
              </g>
            </svg>

            {/* Domain labels */}
            <div className="venn-domain fintech" data-domain="0" data-vx="380" data-vy="108"
              ref={el => (domainRefs.current[0] = el)}>
              <strong>FinTech</strong>
            </div>
            <div className="venn-domain blockchain" data-domain="1" data-vx="180" data-vy="525"
              ref={el => (domainRefs.current[1] = el)}>
              <strong>Blockchain</strong>
            </div>
            <div className="venn-domain ai" data-domain="2" data-vx="580" data-vy="525"
              ref={el => (domainRefs.current[2] = el)}>
              <strong>AI</strong>
            </div>

            {/* Zone labels */}
            <div className="venn-zone stable" data-zone="0" data-vx="288" data-vy="321"
              ref={el => (zoneRefs.current[0] = el)}>
              <strong>Stablecoins</strong>
            </div>
            <div className="venn-zone intelligence" data-zone="1" data-vx="472" data-vy="321"
              ref={el => (zoneRefs.current[1] = el)}>
              <strong>Financial Intelligence</strong>
            </div>
            <div className="venn-zone commerce" data-zone="2" data-vx="380" data-vy="485"
              ref={el => (zoneRefs.current[2] = el)}>
              <strong>Autonomous Commerce</strong>
            </div>
            <div className="venn-zone focus" data-zone="3" data-vx="380" data-vy="372"
              ref={el => (zoneRefs.current[3] = el)}>
              <div className="venn-focus-node" aria-hidden="true" />
              <strong>Next-generation<br />financial infrastructure</strong>
            </div>
          </div>
        </div>

        <div className="explorer-scroll-hint" ref={scrollHintRef}>
          Scroll to explore
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import './TagsSection.css';

// `extraIndent` = px added on top of BASE_LEFT (60px) for the staircase effect
// Row 1: showConnector:false — no dotted lines at all
// Rows 2-4: showConnector:true — vertical segment + horizontal branch
const stackRows = [
  {
    id: 1,
    type: 'single',
    title: 'Stablecoin Settlement & Liquidity',
    logos: [
      { c: '#26A17B', l: '₮' },
      { c: '#1a1a1a', l: 'D' },
      { c: '#FF6B00', l: '»' },
    ],
    extraIndent: 0,
    showConnector: true,
    isFirst: true,
  },
  {
    id: 2,
    type: 'single',
    title: 'Payment Rails & Orchestration',
    logos: [
      { c: '#FFDE00', l: '✦' },
      { c: '#CC0066', l: 'D' },
      { c: '#FF1493', l: 'P' },
    ],
    extraIndent: 40,
    showConnector: true,
  },
  {
    id: 3,
    type: 'dual',
    left: { title: 'Banking, Wallets & Custody' },
    right: {
      title: 'Tokenized Assets & Digital Capital Markets',
      logos: [
        { c: '#000000', l: '✻' },
        { c: '#FF6600', l: '◈' },
        { c: '#00AAFF', l: '»' },
      ],
    },
    extraIndent: 80,
    showConnector: true,
  },
  {
    id: 4,
    type: 'dual',
    left: { title: 'Application Layer' },
    right: {
      title: 'Programmable Finance & Credit',
      logos: [
        { c: '#0066FF', l: '▶' },
        { c: '#8B4513', l: '◉' },
        { c: '#FF6600', l: '◎' },
      ],
    },
    extraIndent: 120,
    showConnector: true,
    isLast: true, // bottom half of vertical line hidden
  },
  {
    id: 5,
    type: 'enduser',
    title: 'End User',
    extraIndent: 0,
    showConnector: false,
  },
];

const BASE_LEFT = 50; // px space reserved for the vertical line

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

export default function TagsSection() {
  return (
    <section className="ts-section">
      <div className="ts-container">

        <motion.div
          className="ts-stack"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {stackRows.map((row, idx) => {
            const totalLeft = BASE_LEFT + row.extraIndent;

            return (
              <motion.div
                key={row.id}
                className={`ts-row ts-row--${row.type}`}
                variants={rowVariants}
                style={{
                  top: `${60 + idx * 36}px`,
                  zIndex: idx,
                  marginLeft: `${totalLeft}px`,
                  marginRight: `${Math.max(row.extraIndent, 20)}px`,
                }}
              >
                {row.showConnector && (
                  <>
                    {/* Vertical dashed segment — SVG so stroke-dashoffset animation works */}
                    <div
                      className={`ts-vseg ${row.isFirst ? 'ts-vseg--first' : ''} ${row.isLast ? 'ts-vseg--last' : ''}`}
                      aria-hidden="true"
                      style={{ left: `-${totalLeft}px` }}
                    >
                      <svg width="20" height="100%" preserveAspectRatio="none">
                        <line
                          x1="10" y1="0" x2="10" y2="100%"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="1.5"
                          strokeDasharray="4 5"
                        />
                      </svg>
                    </div>

                    {/* Horizontal dashed branch */}
                    <div
                      className="ts-hline-wrap"
                      aria-hidden="true"
                      style={{ width: `${totalLeft}px`, left: `-${totalLeft}px` }}
                    >
                      <svg width="100%" height="2">
                        <line
                          x1="10" y1="1" x2="100%" y2="1"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="1.5"
                          strokeDasharray="4 5"
                        />
                      </svg>
                    </div>
                  </>
                )}

                {/* ── Card content ── */}
                {row.type === 'single' && (
                  <div className="ts-card ts-card--white">
                    <span className="ts-card-label">{row.title}</span>
                    <div className="ts-logos">
                      {row.logos.map((lg, i) => (
                        <span key={i} className="ts-logo-circle" style={{ background: lg.c }}>
                          {lg.l}
                        </span>
                      ))}
                      <span className="ts-logo-plus">+</span>
                    </div>
                  </div>
                )}

                {row.type === 'dual' && (
                  <div className="ts-dual">
                    <div className="ts-card ts-card--white ts-card--mini">
                      <span className="ts-card-label">{row.left.title}</span>
                    </div>
                    <div className="ts-bridge" aria-hidden="true">
                      <svg width="36" height="2">
                        <line x1="0" y1="1" x2="36" y2="1"
                          stroke="rgba(255,255,255,0.38)"
                          strokeWidth="1.5"
                          strokeDasharray="4 5"
                        />
                      </svg>
                    </div>
                    <div className="ts-card ts-card--white ts-dual-right">
                      <span className="ts-card-label">{row.right.title}</span>
                      <div className="ts-logos">
                        {row.right.logos.map((lg, i) => (
                          <span key={i} className="ts-logo-circle" style={{ background: lg.c }}>
                            {lg.l}
                          </span>
                        ))}
                        <span className="ts-logo-plus">+</span>
                      </div>
                    </div>
                  </div>
                )}

                {row.type === 'enduser' && (
                  <div className="ts-enduser-center">
                    <div className="ts-card ts-card--dark">
                      <span className="ts-card-label">{row.title}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

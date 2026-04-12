import React from 'react';
import './Hero.css';
import NodeGlobe from './NodeGlobe';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <img src="/arcanum-logo.png" alt="Arcanum Capital" className="hero-logo-img desktop-logo" />
          <h1 className="hero-title">
            <span className="light-text">We invest at the</span><br />
            <span className="light-text">intersection of </span><span className="bold-text">fintech,</span><br />
            <span className="bold-text">blockchain, and AI.</span>
          </h1>
          <button className="btn-primary hero-btn">Work With Us</button>
        </div>
        <div className="hero-globe">
          <div className="globe-placeholder" style={{ border: 'none', animation: 'none', boxShadow: 'none' }}>
            <NodeGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import './Hero.css';
import NodeGlobe from './NodeGlobe';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <img src="/arcanum-logo.png" alt="Arcanum Capital" className="hero-logo-img" />
          <h1 className="hero-title">
            <span className="light-text">We invest at the intersection of</span><br />
            <span className="bold-text">fintech, blockchain, and AI.</span>
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

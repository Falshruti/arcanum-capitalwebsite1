import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Only visible on mobile */}
        <div className="navbar-mobile-brand">
          <img src="/arcanum-logo.png" alt="Arcanum Capital" className="mobile-logo-img" />
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#home" className="active" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
          <a href="#team" onClick={() => setIsMenuOpen(false)}>Team</a>
          <a href="#insights" onClick={() => setIsMenuOpen(false)}>Insights</a>
          <a href="#nexus" onClick={() => setIsMenuOpen(false)}>Nexus</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>

        {/* Hamburger - only visible on mobile */}
        <button 
          className="hamburger" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </button>
      </div>
    </nav>
  );
}

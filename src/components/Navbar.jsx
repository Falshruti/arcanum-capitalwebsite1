import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Only visible on mobile */}
        <div className="navbar-mobile-brand">
          <Link to="/">
            <img src="/arcanum-logo.png" alt="Arcanum Capital" className="mobile-logo-img" />
          </Link>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''} 
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/portfolio" 
            className={isActive('/portfolio') ? 'active' : ''} 
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            to="/#team" 
            onClick={() => setIsMenuOpen(false)}
          >
            Team
          </Link>
          <Link 
            to="/writings" 
            className={isActive('/writings') ? 'active' : ''} 
            onClick={() => setIsMenuOpen(false)}
          >
            Writings
          </Link>
          <Link 
            to="/contact" 
            className={isActive('/contact') ? 'active' : ''} 
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
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

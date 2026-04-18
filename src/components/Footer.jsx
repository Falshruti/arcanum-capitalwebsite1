import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Import highlight images from assets
import highlight1 from '../assets/footer/highlights_1.png';
import highlight2 from '../assets/footer/highlights_2.png';
import highlight3 from '../assets/footer/highlights_3.png';
import highlight4 from '../assets/footer/highlights_4.png';
import footerLogo from '../assets/footer/footer-logo.png';

export default function Footer() {
  const highlights = [highlight1, highlight2, highlight3, highlight4, highlight1, highlight2];

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Top Section: Highlights + Subscribe */}
        <div className="footer-top-grid">
          <div className="social-highlights">
            <div className="highlights-grid">
              {highlights.map((src, idx) => (
                <div key={idx} className="highlight-circle">
                  <img src={src} alt={`Social ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="subscribe-area">
            <h2 className="subscribe-title">Subscribe <span className="thin">to our<br />newsletter.</span></h2>
            <div className="subscribe-form">
              <input type="email" placeholder="Email address" className="email-input" />
              <button className="subscribe-pill">
                Subscribe <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Brand Identity: Logo + Nav */}
        <div className="brand-identity">
          <img src={footerLogo} alt="Arcanum Capital" className="footer-logo-img" />
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/#team">Team</Link>
            <Link to="/#writings">Writings</Link>
            <Link to="/#contact">Contact</Link>
          </nav>
        </div>

        {/* Bottom Bar: Copyright + Socials */}
        <div className="footer-bottom-bar">
          <div className="copyright">
            ©2026 Arcanum Capital. All rights reserved.
          </div>
          <div className="footer-email">
            info@arcanum.capital
          </div>
          <div className="footer-social-icons">
            <a href="#medium" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 11-6.77-6.82A6.77 6.77 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42s-3.38-2.88-3.38-6.42 1.51-6.42 3.38-6.42 3.38 2.88 3.38 6.42zm3.04 0c0 3.17-.31 5.75-.7 5.75-.38 0-.7-2.58-.7-5.75s.32-5.75.7-5.75.7 2.58.7 5.75z" />
              </svg>
            </a>
            <a href="#linkedin" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#x" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Institutional Disclaimer */}
        <div className="footer-disclaimer">
          Disclaimer: The information contained on this website is provided for general informational and introductory purposes only and does not constitute investment advice, an offer, solicitation, or recommendation of any kind.
        </div>
      </div>
    </footer>
  );
}

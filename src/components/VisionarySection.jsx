import React from 'react';
import { Link } from 'react-router-dom';
import './VisionarySection.css';
import logo1 from '../assets/visiontablelogo/logo1.png';
import logo2 from '../assets/visiontablelogo/logo2.png';
import logo3 from '../assets/visiontablelogo/logo3.png';
import logo4 from '../assets/visiontablelogo/logo4.png';
import logo5 from '../assets/visiontablelogo/logo5.png';

const investments = [
  { name: 'HIFI', entry: 'Seed', invested: '2024', sector: 'Payment Rails', logo: logo1 },
  { name: 'utexo', entry: 'Seed', invested: '2025', sector: 'Stablecoin Settlement', logo: logo2, width: '70px' },
  { name: 'Crosspoint', entry: 'Seed', invested: '2024', sector: 'Banking, Wallets & Custody', logo: logo3, width: '100px' },
  { name: 'Momentum', entry: 'Pre-Seed', invested: '2025', sector: 'Programmable Finance', logo: logo4, width: '100px' },
  { name: 'NET', entry: 'Pre-Seed', invested: '2025', sector: 'Stablecoin Settlement', logo: logo5, width: '60px' },
];

export default function VisionarySection() {
  return (
    <section className="vision-section container">
      <div className="vision-container">
        {/* Main Heading — exact text from reference */}
        <h2 className="vision-heading">
          Backing <span className="highlight">visionary</span> ideas that push
          <p>technological boundaries.</p>
        </h2>

        {/* Top Split Divider */}
        <div className="vision-line top"></div>

        {/* Main Content Card — Split Flex Layout */}
        <div className="vision-card">

          {/* Left Side: Branded White Box */}
          <div className="card-visual">
            <div className="brand-lockup">
              <h3 className="brand-acronym">AETFII</h3>
              <div className="backed-by">
                <span className="backed-text">BACKED BY</span>
                <div className="tether-logo">
                  <svg width="60" height="14" viewBox="0 0 100 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2L4 6v8l8 4 8-4V6l-8-4zm0 2.5L18.5 7v6.5l-6.5 3.25L5.5 13.5V7L12 4.5zM12 7l-4 2v4l4 2 4-2V9l-4-2z" />
                    <text x="24" y="18" fontSize="18" fontWeight="700" fontFamily="sans-serif">tether</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Fund Information Column */}
          <div className="card-info">
            <h4 className="fund-label">ARCANUM EMERGING TECHNOLOGIES FUND II</h4>

            <div className="info-block">
              <span className="info-title">DESCRIPTION</span>
              <p className="info-text">Fund II is focused on the blockchain-based payments stack.</p>
            </div>

            <div className="meta-grid">
              <div className="meta-item">
                <span className="meta-label">STAGES</span>
                <span className="meta-val">Pre-Seed - Series A</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">VINTAGE</span>
                <span className="meta-val">2025</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">ANCHOR</span>
                <span className="meta-val">Tether, Tim Draper</span>
              </div>
            </div>

            {/* Pill-shaped Inquire Button */}
            <button className="inquire-btn">
              Inquire
              <span className="arrow-icon">→</span>
            </button>
          </div>
        </div>

        {/* Bottom Split Divider */}
        <div className="vision-line bottom"></div>

        {/* Investments Table */}
        <div className="invest-table-container">
          <table className="invest-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Entry</th>
                <th>Invested</th>
                <th>SECTOR</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="comp-name">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="table-logo"
                        />
                      ) : (
                        <div className="dot-logo"></div>
                      )}
                    </div>
                  </td>
                  <td className="entry-type">{item.entry}</td>
                  <td className="invest-year">{item.invested}</td>
                  <td className="industry-cell">
                    <span className="sector-tag">{item.sector}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Full Portfolio Button */}
        <div className="portfolio-btn-wrap">
          <Link to="/portfolio" className="portfolio-btn">
            View Full Portfolio
          </Link>
        </div>


      </div>
    </section>
  );
}

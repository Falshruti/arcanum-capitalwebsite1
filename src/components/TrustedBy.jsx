import React from 'react';
import './TrustedBy.css';

export default function TrustedBy() {
  const logos = [
    { name: 'Ethena', logoStyle: 'tether' },
    { name: 'ARBITRUM', logoStyle: 'luganodes' },
    { name: 'P E N D L E', logoStyle: 'pendle' },
    { name: 'PRIME Internet', logoStyle: 'sevenx' },
    { name: 'pump.fun', logoStyle: 'mirana' },
    { name: 'NOUS RESEARCH', sub: '', logoStyle: 'foresight' },
    { name: 'Deribit', logoStyle: 'tavis' },
    { name: 'defi.app', logoStyle: 'tether' }
  ];

  return (
    <section className="trusted-by container">
      <div className="trusted-wrapper">
        <div className="trusted-line top"></div>

        <div className="trusted-header">
          <h5 className="trusted-title">TRUSTED BY</h5>
        </div>

        <div className="marquee-container">
          <div className="marquee-track">
            {/* Duplicated list for seamless scrolling */}
            {[...logos, ...logos].map((logo, index) => (
              <div className={`trusted-logo-item ${logo.logoStyle}`} key={index}>
                <span className="logo-main">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="trusted-line bottom"></div>
      </div>
    </section>
  );
}

import React from 'react';
import './TrustedBy.css';

export default function TrustedBy() {
  const logos = [
    { name: 'Tether', logoStyle: 'tether', src: '/trusted-logo1.png' },
    { name: 'Arbitrum', logoStyle: 'luganodes', src: '/trusted-logo2.png' },
    { name: 'Pendle', logoStyle: 'pendle', src: '/trusted-logo3.png' },
    { name: 'Prime Internet', logoStyle: 'sevenx', src: '/trusted-logo4.png' },
    { name: 'pump.fun', logoStyle: 'mirana', src: '/trusted-logo5.png' },
    { name: 'Nous Research', logoStyle: 'foresight', src: '/trusted-logo6.png' },
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
                {logo.src ? (
                  <img src={logo.src} alt={logo.name} className="trusted-logo-img" />
                ) : (
                  <span className="logo-main">{logo.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="trusted-line bottom"></div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import './ThesisText.css';

const textContent = "We invest in the financial infrastructure for digital assets, with Stablecoins as the core primitive and Bitcoin as the parallel sovereign-grade reserve asset.";
const boldStart = 4;
const boldLength = 5;

export default function PostVennText() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Adjust boundaries so the scrub happens directly as the text is passing the center of the screen
      const startTrigger = viewportHeight * 0.75;
      const endTrigger = viewportHeight * 0.25;

      const distance = rect.top + (rect.height / 2); // use center of the section

      if (distance > startTrigger) {
        setScrollProgress(0);
      } else if (distance < endTrigger) {
        setScrollProgress(1);
      } else {
        const factor = (startTrigger - distance) / (startTrigger - endTrigger);
        setScrollProgress(factor);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = textContent.split(' ');

  return (
    <section
      className="thesis-section thesis-reduced-height container"
      ref={sectionRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0rem'
      }}
    >
      <div className="thesis-line-vertical" style={{marginBottom: '5rem' }}></div>

      <div className="thesis-content" style={{ marginTop: '-1rem' }}>
        <p className="thesis-para" style={{ fontSize: '1.45rem', lineHeight: '1.6' }}>
          {textContent.split('').map((char, cIdx) => {
            // Target: "financial infrastructure for digital assets,"
            // Starts at index 17, length 44
            const targetStart = 17;
            const targetEnd = 61;

            let isActive = false;
            if (cIdx >= targetStart && cIdx < targetEnd) {
              const activationPoint = (cIdx - targetStart + 1) / 44;
              isActive = scrollProgress >= activationPoint;
            }

            return (
              <span
                key={cIdx}
                className={`nav-word ${isActive ? 'active' : 'inactive'}`}
              >
                {char}
              </span>
            );
          })}
        </p>
      </div>
    </section >
  );
}

import React, { useEffect, useRef, useState } from 'react';
import './ThesisText.css';

const textContent = "The development of this core infrastructure is driving the global adoption of Stablecoins.";

export default function PostTagsText() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Adjust boundaries so the scrub happens directly as the text is passing the center of the screen
      const startTrigger = viewportHeight * 0.85;
      const endTrigger = viewportHeight * 0.35;

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
        padding: '0rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <div className="thesis-content" style={{ maxWidth: '400px', paddingBottom: '1rem' }}>
        <p className="thesis-para" style={{ fontSize: '1.6rem', lineHeight: '1.6' }}>
          {textContent.split('').map((char, cIdx) => {
            // Target: "core infrastructure"
            // Starts at index 24, length 19
            const targetStart = 24;
            const targetEnd = 43;

            let isActive = false;
            if (cIdx >= targetStart && cIdx < targetEnd) {
              const activationPoint = (cIdx - targetStart + 1) / 19;
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
      <div className="thesis-line-vertical" style={{ marginBottom: '0rem' }}></div>
    </section>
  );
}

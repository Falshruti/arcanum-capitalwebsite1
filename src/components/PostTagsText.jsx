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
      className="thesis-section container"
      ref={sectionRef}
      style={{
        padding: '0',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <div className="thesis-content" style={{ maxWidth: '400px', paddingBottom: '2rem' }}>
        <p className="thesis-para" style={{ fontSize: '1.6rem', lineHeight: '1.6' }}>
          {words.map((word, wIdx) => {
            // Words: The(0) development(1) of(2) this(3) core(4) infrastructure(5)
            const isTarget = wIdx === 4 || wIdx === 5;

            let isActive = false;
            if (isTarget) {
              const targetWordIdx = wIdx - 4; // 0, 1
              const activationPoint = (targetWordIdx + 1) / 3;
              isActive = scrollProgress >= activationPoint;
            }

            return (
              <span
                key={wIdx}
                className={`nav-word ${isActive ? 'active' : 'inactive'}`}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      </div>
      <div className="thesis-line-vertical"></div>
    </section>
  );
}

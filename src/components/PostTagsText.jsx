import React, { useEffect, useRef, useState } from 'react';
import './ThesisText.css';

const textContent = "The development of this core infrastructure is driving the global adoption of Stablecoins.";
const boldStart = 8;
const boldLength = 2;

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

  const lines = [
    "The development of this core infrastructure",
    "is driving the global adoption",
    "of Stablecoins."
  ];

  let wordCounter = 0;

  return (
    <section className="thesis-section container" ref={sectionRef} style={{ padding: '0 0' }}>


      <div className="thesis-content" style={{ maxWidth: '600px', paddingBottom: '2rem' }}>
        <p className="thesis-para" style={{ fontSize: '1.6rem', lineHeight: '1.6', textAlign: 'center' }}>
          {lines.map((line, lIdx) => {
            const lineWords = line.split(' ');
            return (
              <div key={lIdx} style={{ marginBottom: '0.5rem' }}>
                {lineWords.map((word, wIdx) => {
                  const currentWordIndex = wordCounter++;
                  const totalWords = lines.join(' ').split(' ').length;
                  const activationPoint = currentWordIndex / totalWords;
                  const isActive = scrollProgress >= activationPoint;
                  const isBold = word.toLowerCase().includes('core infrastructure');

                  return (
                    <span
                      key={wIdx}
                      className={`nav-word ${isActive ? 'active' : 'inactive'} ${isBold ? 'bold-word' : ''}`}
                      style={isBold ? { color: isActive ? '#fff' : '#64748b', fontWeight: '700' } : {}}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </p>
      </div>
      <div className="thesis-line-vertical"></div>
    </section>
  );
}

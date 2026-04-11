import React, { useEffect, useRef, useState } from 'react';
import './ThesisText.css';

const paragraphs = [
  {
    text: "Stablecoins and digital assets are the most inevitable financial disruption of the last 50 years.",
    boldStart: -1,
    boldLength: 0
  },
  {
    text: "As AI meets blockchain, Stablecoins enable global, programmable payments with instant settlement and near-zero transaction costs.",
    boldStart: -1,
    boldLength: 0
  }
];

export default function ThesisText() {
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

  return (
    <section className="thesis-section container" ref={sectionRef}>
      <div className="thesis-line-vertical"></div>

      <div className="thesis-content">
        {paragraphs.map((p, pIdx) => {
          const words = p.text.split(' ');

          return (
            <p key={pIdx} className="thesis-para">
              {words.map((word, wIdx) => {
                let globalIdxOffset = pIdx === 1 ? paragraphs[0].text.split(' ').length : 0;
                let globalIndex = globalIdxOffset + wIdx;
                let totalWords = paragraphs[0].text.split(' ').length + paragraphs[1].text.split(' ').length;

                const activationPoint = (globalIndex / totalWords);
                // Using exact binary state for pure white highlight versus inactive gray
                const isActive = scrollProgress >= activationPoint;

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
          );
        })}
      </div>
    </section>
  );
}

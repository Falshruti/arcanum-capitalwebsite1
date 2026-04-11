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

      // The section starts when its top hits the top of the viewport
      // It ends when its bottom hits the bottom of the viewport
      const scrollableDistance = rect.height - viewportHeight;

      let progress = 0;
      if (scrollableDistance > 0) {
        if (rect.top >= 0) {
          progress = 0;
        } else if (rect.bottom <= viewportHeight) {
          progress = 1;
        } else {
          progress = Math.abs(rect.top) / scrollableDistance;
        }
      }
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="thesis-section container" ref={sectionRef}>
      <div className="thesis-sticky">
        <div className="thesis-line-vertical"></div>

        <div className="thesis-content">
        {paragraphs.map((p, pIdx) => {
          const words = p.text.split(' ');

          return (
            <p key={pIdx} className="thesis-para">
              {words.map((word, wIdx) => {
                // Paragraph 0: "inevitable(7) financial(8) disruption(9)"
                // Paragraph 1: "global,(6) programmable(7) payments(8)"
                const isTargetP0 = pIdx === 0 && wIdx >= 7 && wIdx <= 9;
                const isTargetP1 = pIdx === 1 && wIdx >= 6 && wIdx <= 8;
                
                let isActive = false;
                if (isTargetP0) {
                  const targetWordIdx = wIdx - 7; // 0, 1, 2
                  const activationPoint = (targetWordIdx + 1) / 4;
                  // Paragraph 1 happens in the first half of the scroll (0->0.5 mapped to 0->1)
                  const localProgress = Math.min(Math.max(scrollProgress * 2, 0), 1);
                  isActive = localProgress >= activationPoint;
                } else if (isTargetP1) {
                  const targetWordIdx = wIdx - 6; // 0, 1, 2
                  const activationPoint = (targetWordIdx + 1) / 4;
                  // Paragraph 2 happens in the second half of the scroll (0.5->1 mapped to 0->1)
                  const localProgress = Math.min(Math.max((scrollProgress - 0.5) * 2, 0), 1);
                  isActive = localProgress >= activationPoint;
                }
                // If not target, it stays inactive (not updated)

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
      </div>
    </section>
  );
}

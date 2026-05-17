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
          return (
            <p key={pIdx} className="thesis-para">
              {p.text.split('').map((char, cIdx) => {
                let isActive = false;
                
                if (pIdx === 0) {
                  // Target: "inevitable financial disruption"
                  // Starts at index 44, length 31
                  const targetStart = 44;
                  const targetEnd = 75; 
                  
                  if (cIdx >= targetStart && cIdx < targetEnd) {
                    const localProgress = Math.min(Math.max(scrollProgress * 2, 0), 1);
                    const activationPoint = (cIdx - targetStart + 1) / 31;
                    isActive = localProgress >= activationPoint;
                  }
                } else if (pIdx === 1) {
                  // Target: "global, programmable payments"
                  // Starts at index 43, length 29
                  const targetStart = 43;
                  const targetEnd = 72;
                  
                  if (cIdx >= targetStart && cIdx < targetEnd) {
                    const localProgress = Math.min(Math.max((scrollProgress - 0.5) * 2, 0), 1);
                    const activationPoint = (cIdx - targetStart + 1) / 29;
                    isActive = localProgress >= activationPoint;
                  }
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
          );
        })}
        </div>
      </div>
    </section>
  );
}

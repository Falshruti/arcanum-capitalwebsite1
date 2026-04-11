import React, { useState } from 'react';
import './VennDiagram.css';

export default function VennDiagram() {
  const [activeCircle, setActiveCircle] = useState('left');

  return (
    <section className="venn-section container">
      <div className="venn-container" onMouseLeave={() => setActiveCircle('left')}>
        <div 
          className={`venn-circle venn-top ${activeCircle === 'top' ? 'venn-solid' : ''}`}
          onMouseEnter={() => setActiveCircle('top')}
        >
          <span>FinTech</span>
        </div>
        <div 
          className={`venn-circle venn-left ${activeCircle === 'left' ? 'venn-solid' : ''}`}
          onMouseEnter={() => setActiveCircle('left')}
        >
          <span>Blockchain</span>
        </div>
        <div 
          className={`venn-circle venn-right ${activeCircle === 'right' ? 'venn-solid' : ''}`}
          onMouseEnter={() => setActiveCircle('right')}
        >
          <span>AI</span>
        </div>
        
        <div className={`venn-label label-center ${['top', 'left', 'right'].includes(activeCircle) ? 'active-text' : ''}`}>
          Digital Assets
        </div>
        <div className={`venn-label label-top-left ${['top', 'left'].includes(activeCircle) ? 'active-text' : ''}`}>
          Stablecoins
        </div>
        <div className={`venn-label label-top-right ${['top', 'right'].includes(activeCircle) ? 'active-text' : ''}`}>
          OS Improvements
        </div>
        <div className={`venn-label label-bottom ${['left', 'right'].includes(activeCircle) ? 'active-text' : ''}`}>
          <span>Agentic</span>
          <br />
          <span>Payments</span>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import './InvestmentsStack.css';

const stackItems = [
  {
    title: 'Momentum: From Zero to the Largest DEX on Sui',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    tag: 'Blog'
  },
  {
    title: 'Momentum: From Zero to the Largest DEX on Sui',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    tag: 'News'
  },
  {
    title: 'Momentum: From Zero to the Largest DEX on Sui',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    tag: 'Blog'
  },
  {
    title: 'Momentum: From Zero to the Largest DEX on Sui',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    tag: 'Blog'
  },
  {
    title: 'Momentum: From Zero to the Largest DEX on Sui',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    tag: 'Blog'
  },
  {
    title: 'Momentum: From Zero to the Largest DEX on Sui',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    tag: 'Blog'
  }
];

export default function InvestmentsStack() {
  return (
    <section className="investments-stack container">
      <div className="stack-header">
        <h2 className="stack-title">
          We back the builders fine-tuning the<br />
          <span className="highlight">blockchain-based payments</span> stack.
        </h2>
      </div>

      <div className="stack-grid-container">
        <div className="stack-grid">
          {stackItems.map((item, index) => (
            <div key={index} className="stack-card">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>
              <div className="card-tag">
                <button className="tag-btn">{item.tag}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stack-footer">
        <button className="view-all-btn">View All Insights</button>
      </div>
    </section>
  );
}

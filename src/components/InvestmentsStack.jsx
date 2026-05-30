import React from 'react';
import { Link } from 'react-router-dom';
import './InvestmentsStack.css';
import logocointelegraph from '../assets/news/logocointelegraph.svg';
import forbes from '../assets/news/forbes.svg';
import dein from '../assets/news/blog1.png';

const stackItems = [
  {
    id: 1,
    title: 'How DEIN is Disrupting the Trillion-Dollar Insurance Industry',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    category: 'Blog',
    tag: 'Blog',
    logo: dein,
    date: 'January 7, 2026',
  },
  {
    id: 2,
    title: 'Arcanum Capital Disrupts Web3 Venture Capital With ‘Circular Economy',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    category: 'News',
    tag: 'News',
    logo: forbes,
    date: 'February 7, 2024',
  },
  {
    id: 3,
    title: 'Momentum: From Zero to the Largest DEX on Sui',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    category: 'Blog',
    tag: 'Blog',
    logo: logocointelegraph,
    date: 'Apr 15, 2025',
  },
  {
    id: 4,
    title: 'Arcanum Capital Disrupts Web3 Venture Capital With ‘Circular Economy’',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    category: 'News',
    tag: 'News',
    logo: logocointelegraph,
    date: 'February 7, 2024',
  },
  {
    id: 5,
    title: 'The Internet is Being Rewritten: Santa Browser Holds the Pen',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    category: 'Blog',
    tag: 'Blog',
    logo: logocointelegraph,
    date: 'Mar 22, 2025',
  },
  {
    id: 6,
    title: 'Momentum: From Zero to the Largest DEX on Sui',
    desc: 'We back the builders fine tuning the blockchain based payments stack.',
    category: 'Blog',
    tag: 'Blog',
    logo: logocointelegraph,
    date: 'Mar 10, 2025',
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
        <Link to="/insights" className="view-all-btn">View All Insights</Link>
      </div>
    </section>
  );
}

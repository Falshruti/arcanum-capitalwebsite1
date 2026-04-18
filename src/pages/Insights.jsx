import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Insights.css';

const insightsData = [
  { id: 1, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Blog' },
  { id: 2, title: 'The Internet is Being Rewritten: Santa Browser Holds the Pen', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'News', tag: 'News' },
  { id: 3, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Blog' },
  { id: 4, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'News', tag: 'News' },
  { id: 5, title: 'The Internet is Being Rewritten: Santa Browser Holds the Pen', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Blog' },
  { id: 6, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Blog' },
  { id: 7, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'News', tag: 'News' },
  { id: 8, title: 'The Internet is Being Rewritten: Santa Browser Holds the Pen', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Blog' },
  { id: 9, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Blog' },
];

export default function Insights() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Blog', 'News'];

  const filteredItems = activeFilter === 'All'
    ? insightsData
    : insightsData.filter(item => item.category === activeFilter);

  return (
    <div className="insights-page">
      <div className="container insights-container">
        <header className="insights-header">
          <h1 className="insights-title">Insights</h1>
          <div className="insights-filters">
            {filters.map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        <div className="insights-grid">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              className="insight-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
                <div className="card-footer">
                  <span className="pill-tag">{item.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

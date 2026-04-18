import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Writings.css';

const writingsData = [
  { id: 1, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Payments' },
  { id: 2, title: 'The Internet is Being Rewritten: Santa Browser Holds the Pen', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'News', tag: 'Infrastructure' },
  { id: 3, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Payments' },
  { id: 4, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'News', tag: 'Payments' },
  { id: 5, title: 'The Internet is Being Rewritten: Santa Browser Holds the Pen', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Infrastructure' },
  { id: 6, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Payments' },
  { id: 7, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'News', tag: 'Payments' },
  { id: 8, title: 'The Internet is Being Rewritten: Santa Browser Holds the Pen', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Infrastructure' },
  { id: 9, title: 'Momentum: From Zero to the Largest DEX on Sui', desc: 'We back the builders fine tuning the blockchain based payments stack.', category: 'Blog', tag: 'Payments' },
];

export default function Writings() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Blog', 'News'];

  const filteredItems = activeFilter === 'All' 
    ? writingsData 
    : writingsData.filter(item => item.category === activeFilter);

  return (
    <div className="writings-page">
      <div className="container writings-container">
        <header className="writings-header">
          <h1 className="writings-title">Writings</h1>
          <div className="writings-filters">
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

        <div className="writings-grid">
          {filteredItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              className="writing-card"
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

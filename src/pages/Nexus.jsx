import React from 'react';
import { motion } from 'framer-motion';
import './Nexus.css';

export default function Nexus() {
  return (
    <div className="nexus-page">
      <div className="container nexus-container">
        <header className="nexus-header">
          <motion.h1 
            className="nexus-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Nexus
          </motion.h1>
          <motion.p 
            className="nexus-subtitle"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            A ecosystem coordinate for the next generation of fintech infrastructure.
          </motion.p>
        </header>

        <div className="nexus-placeholder">
          <div className="placeholder-content">
            <h2 className="coming-soon">Coming Soon</h2>
            <div className="nexus-divider"></div>
            <p>Our ecosystem hub is currently under development. Stay tuned for insights, community, and coordination.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

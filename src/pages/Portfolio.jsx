import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo1 from '../assets/portfoliologo/logo1.png';
import logo2 from '../assets/portfoliologo/logo2.png';
import logo3 from '../assets/portfoliologo/logo3.png';
import logo4 from '../assets/portfoliologo/logo4.png';
import logo5 from '../assets/portfoliologo/logo5.png';
import aetfiiImg from '../assets/visiontablelogo/aetfii.png';
import './Portfolio.css';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Fund I', 'Fund II'];

  const projects = [
    {
      id: 1,
      fund: 'ARCANUM EMERGING TECHNOLOGIES FUND II',
      description: 'Fund II is focused on the blockchain-based payments stack.',
      stages: 'Pre-Seed - Series A',
      vintage: '2025',
      anchor: 'Tether, Tim Draper',
      logo: 'utexo'
    }
  ];

  const tableData = [
    { id: 1, name: 'Babylon', entry: 'Series A', invested: '2025', sector: 'Application Layer', icon: logo1, isImg: true },
    { id: 2, name: 'Nexus', entry: 'Series A', invested: '2025', sector: 'Stablecoin Settlement', icon: logo2, isImg: true },
    { id: 3, name: 'Babylon', entry: 'Series A', invested: '2025', sector: 'Programmable Finance', icon: logo3, isImg: true },
    { id: 4, name: 'Babylon', entry: 'Series A', invested: '2025', sector: 'Tokenized Assets', icon: logo4, isImg: true },
    { id: 5, name: 'Babylon', entry: 'Series A', invested: '2025', sector: 'Stablecoin Settlement', icon: logo5, isImg: true },
    { id: 6, name: 'Babylon', entry: 'Series A', invested: '2025', sector: 'Application Layer', icon: logo1, isImg: true },
    { id: 7, name: 'Babylon', entry: 'Series A', invested: '2025', sector: 'Stablecoin Settlement', icon: logo2, isImg: true },
    { id: 8, name: 'Babylon', entry: 'Series A', invested: '2025', sector: 'Programmable Finance', icon: logo3, isImg: true },
    { id: 9, name: 'Babylon', entry: 'Series A', invested: '2025', sector: 'Tokenized Assets', icon: logo4, isImg: true },
    { id: 10, name: 'Babylon', entry: 'Series A', invested: '2025', sector: 'Stablecoin Settlement', icon: logo5, isImg: true },
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.fund === activeFilter);

  return (
    <div className="portfolio-page">
      <div className="portfolio-hero-section">
        <div className="container portfolio-container">
          <header className="portfolio-header">
            <h1 className="portfolio-title">Portfolio</h1>
            <div className="portfolio-filters">
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

          <div className="portfolio-line top"></div>

          <div className="portfolio-list">
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                className="portfolio-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="item-logos">
                  <img src={aetfiiImg} alt={project.logo} className="item-logo-sole" />
                </div>

                <div className="item-content">
                  <div className="item-header">
                    <h2 className="fund-name">{project.fund}</h2>
                  </div>

                  <div className="item-details-grid">
                    <div className="detail-group description">
                      <label>DESCRIPTION</label>
                      <p>{project.description}</p>
                    </div>

                    <div className="stats-row">
                      <div className="detail-group">
                        <label>STAGES</label>
                        <p>{project.stages}</p>
                      </div>
                      <div className="detail-group">
                        <label>VINTAGE</label>
                        <p>{project.vintage}</p>
                      </div>
                      <div className="detail-group">
                        <label>ANCHOR</label>
                        <p>{project.anchor}</p>
                      </div>
                    </div>

                    {/* Added Inquire Button as per design */}
                    <div className="action-area">
                      <button className="inquire-btn">
                        Inquire
                        <span className="arrow-icon">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="portfolio-line bottom"></div>
        </div>
      </div>

      <div className="container portfolio-container">
        <div className="portfolio-table-section">
          <div className="table-header">
            <div className="col-name">NAME</div>
            <div className="col-entry">ENTRY</div>
            <div className="col-invested">INVESTED</div>
            <div className="col-sector">SECTOR</div>
          </div>

          <div className="table-body">
            {tableData.map(item => (
              <div key={item.id} className="table-row">
                <div className="col-name">
                  {item.isImg ? (
                    <img 
                      src={item.icon} 
                      alt={item.name} 
                      className="name-icon-img" 
                    />
                  ) : (
                    <span className="name-icon">{item.icon}</span>
                  )}
                </div>
                <div className="col-entry">{item.entry}</div>
                <div className="col-invested">{item.invested}</div>
                <div className="col-sector">
                  <span className="sector-tag">{item.sector}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

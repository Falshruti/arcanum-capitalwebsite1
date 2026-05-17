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
      fund: 'ARCANUM EMERGING TECHNOLOGIES FUND I',
      filter: 'Fund I',
      description: 'Fund I focused on early-stage investments across DeFi, Gaming, and Web3 infrastructure.',
      stages: 'Seed - Series A',
      vintage: '2021',
      anchor: 'Sandeep Nailwal, Polygon',
      logo: 'utexo'
    },
    {
      id: 2,
      fund: 'ARCANUM EMERGING TECHNOLOGIES FUND II',
      filter: 'Fund II',
      description: 'Fund II is focused on the blockchain-based payments stack.',
      stages: 'Pre-Seed - Series A',
      vintage: '2025',
      anchor: 'Tether, Tim Draper',
      logo: 'utexo'
    }
  ];

  const tableData = [
    { id: 1, fund: 'Fund I', name: 'TR8DE.AI', category: 'Application Layer', date: '2025', entry: 'Series A', isImg: true, icon: logo1, url: 'https://tr8de.ai/' },
    { id: 2, fund: 'Fund I', name: 'utexo', category: 'Stablecoin Settlement', date: '2025', entry: 'Series A', isImg: true, icon: logo2, url: 'https://utexo.com/' },
    { id: 3, fund: 'Fund I', name: 'DEIN', category: 'Programmable Finance', date: '2025', entry: 'Series A', isImg: true, icon: logo3, url: 'https://dein.fi/' },
    { id: 4, fund: 'Fund I', name: 'GAIB', category: 'Tokenized Assets', date: '2025', entry: 'Series A', isImg: true, icon: logo4, url: 'https://gaib.ai/' },
    { id: 5, fund: 'Fund I', name: 'opNET', category: 'Stablecoin Settlement', date: '2025', entry: 'Series A', isImg: true, icon: logo5, url: 'https://opnet.org/' },

    { id: 6, fund: 'Fund II', name: 'TR8DE.AI', category: 'Application Layer', date: '2025', entry: 'Series A', isImg: true, icon: logo1, url: 'https://tr8de.ai/' },
    { id: 7, fund: 'Fund II', name: 'utexo', category: 'Stablecoin Settlement', date: '2025', entry: 'Series A', isImg: true, icon: logo2, url: 'https://utexo.com/' },
    { id: 8, fund: 'Fund II', name: 'DEIN', category: 'Programmable Finance', date: '2025', entry: 'Series A', isImg: true, icon: logo3, url: 'https://dein.fi/' },
    { id: 9, fund: 'Fund II', name: 'GAIB', category: 'Tokenized Assets', date: '2025', entry: 'Series A', isImg: true, icon: logo4, url: 'https://gaib.ai/' },
    { id: 10, fund: 'Fund II', name: 'opNET', category: 'Stablecoin Settlement', date: '2025', entry: 'Series A', isImg: true, icon: logo5, url: 'https://opnet.org/' },
  ];

  const filteredTableData = activeFilter === 'All'
    ? tableData
    : tableData.filter(item => item.fund === activeFilter);

  const heroProject = activeFilter === 'All' ? projects[1] : null;

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

          {heroProject && (
            <>
              <div className="portfolio-line top"></div>
              <div className="portfolio-list">
                <motion.div
                  key={heroProject.id}
                  className="portfolio-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="item-logos">
                    <img src={aetfiiImg} alt={heroProject.logo} className="item-logo-sole" />
                  </div>

                  <div className="item-content">
                    <div className="item-header">
                      <h2 className="fund-name">{heroProject.fund}</h2>
                    </div>

                    <div className="item-details-grid">
                      <div className="detail-group description">
                        <label>DESCRIPTION</label>
                        <p>{heroProject.description}</p>
                      </div>

                      <div className="stats-row">
                        <div className="detail-group">
                          <label>STAGES</label>
                          <p>{heroProject.stages}</p>
                        </div>
                        <div className="detail-group">
                          <label>VINTAGE</label>
                          <p>{heroProject.vintage}</p>
                        </div>
                        <div className="detail-group">
                          <label>ANCHOR</label>
                          <p>{heroProject.anchor}</p>
                        </div>
                      </div>

                      <div className="action-area">
                        <button className="inquire-btn">
                          Inquire
                          <span className="arrow-icon">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="portfolio-line bottom"></div>
            </>
          )}
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
            {filteredTableData.map(item => (
              <a 
                key={item.id} 
                className="table-row" 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="col-name">
                  {item.isImg ? (
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="name-icon-img"
                    />
                  ) : (
                    <>
                      <span className="name-icon">{item.name[0]}</span>
                      <span className="name-text">{item.name}</span>
                    </>
                  )}
                </div>
                <div className="col-entry">{item.entry || '-'}</div>
                <div className="col-invested">{item.date || '-'}</div>
                <div className="col-sector">
                  <span className="sector-tag">{item.category}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

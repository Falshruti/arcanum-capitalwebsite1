import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo1 from '../assets/portfoliologo/logo1.png';
import logo2 from '../assets/portfoliologo/logo2.png';
import logo3 from '../assets/portfoliologo/logo3.png';
import logo4 from '../assets/portfoliologo/logo4.png';
import logo5 from '../assets/portfoliologo/logo5.png';
import aetfiiImg from '../assets/visiontablelogo/aetfii.png';
import babylonLogo from '../assets/babylon-logo.png';

// Fund I Logos (exact assets from arcanum.capital)
import availLogo from '../assets/fund1logos/avail.png';
import raiinmakerLogo from '../assets/fund1logos/raiinmaker.png';
import gitopiaLogo from '../assets/fund1logos/gitopia.png';
import capxLogo from '../assets/fund1logos/capx.png';
import kudoMoneyLogo from '../assets/fund1logos/kudo-money.png';
import dopamineLogo from '../assets/fund1logos/dopamine.png';
import cityProtocolLogo from '../assets/fund1logos/city-protocol.png';
import nitroLogo from '../assets/fund1logos/nitro.png';
import crossTheAgesLogo from '../assets/fund1logos/cross-the-ages.png';
import maseerLogo from '../assets/fund1logos/maseer.png';
import kgenLogo from '../assets/fund1logos/kgen.png';
import kandolaLogo from '../assets/fund1logos/kandola.png';
import brillFinanceLogo from '../assets/fund1logos/brill-finance.png';
import expandLogo from '../assets/fund1logos/expand.png';
import bitgetWalletLogo from '../assets/fund1logos/bitget-wallet.png';
import tallyupLogo from '../assets/fund1logos/tallyup.png';
import championsLogo from '../assets/fund1logos/champions.png';
import nudgeLogo from '../assets/fund1logos/nudge.png';
import lazyGamesLogo from '../assets/fund1logos/lazy-games.png';
import exInteractiveLogo from '../assets/fund1logos/ex-interactive.png';
import rfxLogo from '../assets/fund1logos/rfx.png';
import santaLogo from '../assets/fund1logos/santa.png';
import lucidaoLogo from '../assets/fund1logos/lucidao.png';
import scribbleDaoLogo from '../assets/fund1logos/scribble-dao.png';
import luxoLogo from '../assets/fund1logos/luxo.png';
import zedLogo from '../assets/fund1logos/zed.png';
import pstakeLogo from '../assets/fund1logos/pstake.png';
import esportsPlayersLogo from '../assets/fund1logos/esports-players.png';
import pufferLogo from '../assets/fund1logos/puffer.png';
import vurseLogo from '../assets/fund1logos/vurse.png';
import playzapLogo from '../assets/fund1logos/playzap.png';

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
      description: 'Fund II backs fintech, blockchain, and AI innovations shaping intelligent, decentralized finance.',
      stages: 'Pre-Seed - Series A',
      vintage: '2025',
      anchor: 'Tether, Tim Draper',
      logo: 'utexo'
    }
  ];

  const tableData = [
    // Fund I
    { id: 1, fund: 'Fund I', name: 'Avail', category: 'DATA AVAILABILITY', date: '2021', entry: 'Seed', isImg: true, icon: availLogo, url: 'https://www.availproject.org/' },
    { id: 2, fund: 'Fund I', name: 'Bitget Wallet', category: 'WALLETS & CUSTODY', date: '2022', entry: 'Seed', isImg: true, icon: bitgetWalletLogo, url: 'https://web3.bitget.com/' },
    { id: 3, fund: 'Fund I', name: 'Bril Finance', category: 'CROSS-CHAIN YIELD', date: '2022', entry: 'Seed', isImg: true, icon: brillFinanceLogo, url: 'https://www.bril.finance/' },
    { id: 4, fund: 'Fund I', name: 'Capx', category: 'AI AGENT ECONOMY', date: '2021', entry: 'Pre-Seed', isImg: true, icon: capxLogo, url: 'https://www.capx.ai/' },
    { id: 5, fund: 'Fund I', name: 'Champions', category: 'GAMING', date: '2022', entry: 'Seed', isImg: true, icon: championsLogo, url: 'https://www.champions.games/' },
    { id: 6, fund: 'Fund I', name: 'City Protocol', category: 'TOKENIZATION', date: '2021', entry: 'Seed', isImg: true, icon: cityProtocolLogo, url: 'https://cityprotocol.co/' },
    { id: 7, fund: 'Fund I', name: 'Cross The Ages', category: 'GAMING', date: '2021', entry: 'Seed', isImg: true, icon: crossTheAgesLogo, url: 'https://www.crosstheages.com/' },
    { id: 8, fund: 'Fund I', name: 'Dopamine', category: 'MARKET INTELLIGENCE', date: '2021', entry: 'Seed', isImg: true, icon: dopamineLogo, url: 'https://www.web3intelligence.com/' },
    { id: 9, fund: 'Fund I', name: 'Esports Players League', category: 'ESPORTS', date: '2022', entry: 'Seed', isImg: true, icon: esportsPlayersLogo, url: 'https://espl.gg/' },
    { id: 10, fund: 'Fund I', name: 'EX Interactive Gaming', category: 'SPORTS/GAMING', date: '2022', entry: 'Seed', isImg: true, icon: exInteractiveLogo, url: 'https://ex-interactive.com/' },
    { id: 11, fund: 'Fund I', name: 'Expand', category: 'ZK INTEROPERABILITY', date: '2022', entry: 'Seed', isImg: true, icon: expandLogo, url: 'https://expand.network/' },
    { id: 12, fund: 'Fund I', name: 'Gitopia', category: 'DECENTRALIZED CODE REPOSITORY', date: '2021', entry: 'Seed', isImg: true, icon: gitopiaLogo, url: 'https://gitopia.com/' },
    { id: 13, fund: 'Fund I', name: 'Kandola', category: 'DEPIN', date: '2022', entry: 'Seed', isImg: true, icon: kandolaLogo, url: 'https://kandola.network/' },
    { id: 14, fund: 'Fund I', name: 'KGEN', category: 'HUMAN DATA', date: '2021', entry: 'Seed', isImg: true, icon: kgenLogo, url: 'https://kgen.io/' },
    { id: 15, fund: 'Fund I', name: 'Kudo Money', category: 'GAMING & REWARDS', date: '2021', entry: 'Seed', isImg: true, icon: kudoMoneyLogo, url: 'https://www.kudomoney.com/' },
    { id: 16, fund: 'Fund I', name: 'LazyGamesAI', category: 'GAMING', date: '2022', entry: 'Seed', isImg: true, icon: lazyGamesLogo, url: 'https://lazygames.ai/' },
    { id: 17, fund: 'Fund I', name: 'LUCIDAO', category: 'TOKENIZED ASSETS', date: '2022', entry: 'Seed', isImg: true, icon: lucidaoLogo, url: 'https://lucidao.com/' },
    { id: 18, fund: 'Fund I', name: 'LUXO', category: 'LUXURY TOKENIZATION', date: '2022', entry: 'Seed', isImg: true, icon: luxoLogo, url: 'https://luxochain.io/' },
    { id: 19, fund: 'Fund I', name: 'MASEER', category: 'RWA FINANCE', date: '2021', entry: 'Seed', isImg: true, icon: maseerLogo, url: 'https://maseer.finance/' },
    { id: 20, fund: 'Fund I', name: 'Nitro', category: 'AGENT COMMERCE', date: '2021', entry: 'Seed', isImg: true, icon: nitroLogo, url: 'https://nitrograph.com/' },
    { id: 21, fund: 'Fund I', name: 'Nudge', category: 'AI HEALTH', date: '2022', entry: 'Seed', isImg: true, icon: nudgeLogo, url: 'https://getnudge.ai/' },
    { id: 22, fund: 'Fund I', name: 'PlayZap', category: 'SKILL GAMING', date: '2022', entry: 'Seed', isImg: true, icon: playzapLogo, url: 'https://www.playzap.games/' },
    { id: 23, fund: 'Fund I', name: 'Pstake', category: 'DEFI', date: '2022', entry: 'Seed', isImg: true, icon: pstakeLogo, url: 'https://pstake.finance/' },
    { id: 24, fund: 'Fund I', name: 'Puffer', category: 'ETHEREUM RESTAKING, L1 APPCHAIN', date: '2022', entry: 'Seed', isImg: true, icon: pufferLogo, url: 'https://www.puffer.fi/' },
    { id: 25, fund: 'Fund I', name: 'Raiinmaker', category: 'AI DATA', date: '2021', entry: 'Seed', isImg: true, icon: raiinmakerLogo, url: 'https://www.raiinmaker.com/' },
    { id: 26, fund: 'Fund I', name: 'RFX', category: 'DERIVATIVES', date: '2022', entry: 'Seed', isImg: true, icon: rfxLogo, url: 'https://rfx.finance/' },
    { id: 27, fund: 'Fund I', name: 'Santa', category: 'WEB3 BROWSER', date: '2022', entry: 'Seed', isImg: true, icon: santaLogo, url: 'https://www.santabrowser.com/' },
    { id: 28, fund: 'Fund I', name: 'ScribbleDAO', category: 'CREATOR ECONOMY', date: '2022', entry: 'Pre-Seed', isImg: true, icon: scribbleDaoLogo, url: 'https://scribbledao.network/' },
    { id: 29, fund: 'Fund I', name: 'TallyUP!', category: 'CASUAL GAMING', date: '2022', entry: 'Seed', isImg: true, icon: tallyupLogo, url: 'https://www.tallyup.com/' },
    { id: 30, fund: 'Fund I', name: 'VURSE', category: 'CREATOR ECONOMY', date: '2022', entry: 'Pre-Seed', isImg: true, icon: vurseLogo, url: 'https://vurse.com/' },
    { id: 31, fund: 'Fund I', name: 'ZED', category: 'AI CRM', date: '2022', entry: 'Pre-Seed', isImg: true, icon: zedLogo, url: 'https://zexponential.com' },

    // Fund II
    { id: 32, fund: 'Fund II', name: 'Babylon', category: 'BITCOIN STAKING', date: '2024', entry: 'Seed', isImg: true, icon: babylonLogo, url: 'https://babylonlabs.io/' },
    { id: 33, fund: 'Fund II', name: 'Crosspoint', category: 'GLOBAL PAYMENTS', date: '2024', entry: 'Seed', isImg: false, url: 'https://www.crosspoint.global/' },
    { id: 34, fund: 'Fund II', name: 'DEIN', category: 'ONCHAIN INSURANCE', date: '2025', entry: 'Seed', isImg: true, icon: logo3, url: 'https://dein.fi/' },
    { id: 35, fund: 'Fund II', name: 'GAIB', category: 'AI COMPUTE FINANCE', date: '2025', entry: 'Seed', isImg: true, icon: logo4, url: 'https://gaib.ai/' },
    { id: 36, fund: 'Fund II', name: 'HIFI', category: 'RWA LENDING', date: '2024', entry: 'Seed', isImg: false, url: 'https://hifi.com' },
    { id: 37, fund: 'Fund II', name: 'Magnolia Financial', category: 'STABLEBANK', date: '2026', entry: 'Pre-Seed', isImg: false, url: 'https://magnolia.financial' },
    { id: 38, fund: 'Fund II', name: 'Momentum', category: 'DEX & LIQUIDITY', date: '2025', entry: 'Pre-Seed', isImg: false, url: 'https://mmt.finance/' },
    { id: 39, fund: 'Fund II', name: 'NERO', category: 'MODULAR L1', date: '2025', entry: 'Seed', isImg: false, url: 'https://nerochain.io/' },
    { id: 40, fund: 'Fund II', name: '0G', category: 'AI INFRASTRUCTURE', date: '2024', entry: 'Seed', isImg: false, url: 'https://0g.ai/' },
    { id: 41, fund: 'Fund II', name: 'OP_NET', category: 'BITCOIN APPS', date: '2025', entry: 'Pre-Seed', isImg: true, icon: logo5, url: 'https://opnet.org/' },
    { id: 42, fund: 'Fund II', name: 'SatLayer', category: 'BITCOIN SECURITY', date: '2024', entry: 'Seed', isImg: false, url: 'https://satlayer.xyz/' },
    { id: 43, fund: 'Fund II', name: 'Sati', category: 'CRYPTO PAYMENTS', date: '2024', entry: 'Pre-Seed', isImg: false, url: 'https://www.sati.pro/' },
    { id: 44, fund: 'Fund II', name: 'Showdown', category: 'WEB3 WAGERING', date: '2025', entry: 'Seed', isImg: false, url: 'https://showdown.me/' },
    { id: 45, fund: 'Fund II', name: 'Symphony', category: 'DIGITAL WEALTH', date: '2025', entry: 'Seed', isImg: false, url: 'https://www.symphony.io/' },
    { id: 46, fund: 'Fund II', name: 'TR8DE.AI', category: 'AI TRADING TERMINAL', date: '2025', entry: 'Pre-Seed', isImg: true, icon: logo1, url: 'https://www.tr8de.ai/' },
    { id: 47, fund: 'Fund II', name: 'UTEXO', category: 'STABLECOIN SETTLEMENT', date: '2025', entry: 'Seed', isImg: true, icon: logo2, url: 'https://utexo.com/' },
    { id: 48, fund: 'Fund II', name: 'Zircuit', category: 'NEOFINANCE', date: '2024', entry: 'Seed', isImg: false, url: 'https://www.zircuit.com/' },
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

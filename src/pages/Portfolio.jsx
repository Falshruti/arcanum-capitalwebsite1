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
    { id: 1, fund: 'Fund I', name: 'Duet', category: 'DeFi', date: '05/2021', x: 'https://x.com/duetprotocol', website: 'https://pro.duet.finance/#/lite/trade/futures', coinvestors: 'Draper Dragon, DHVC' },
    { id: 2, fund: 'Fund I', name: 'Arcana', category: 'Modular', date: '05/2021', x: 'https://x.com/ArcanaNetwork', website: 'https://arcana.network/', coinvestors: 'Balaji Srinivasan, Republic, Digital Currency Group, Kenetic Capital' },
    { id: 3, fund: 'Fund I', name: 'Avail', category: 'Modular', date: '', x: 'https://x.com/AvailProject', website: 'https://availproject.org/', coinvestors: 'Dragonfly, Founders Fund, Balaji Srinivasan' },
    { id: 4, fund: 'Fund I', name: 'Raiinmaker', category: 'DePIN', date: '06/2021', x: 'https://x.com/Raiinmakerapp', website: 'https://www.raiinmaker.com/', coinvestors: 'Jump Capital, MEXC, Gate io' },
    { id: 5, fund: 'Fund I', name: 'Gitopia', category: 'dApp', date: '07/2021', x: 'https://x.com/gitopiaDAO', website: 'https://gitopia.com/', coinvestors: '-' },
    { id: 6, fund: 'Fund I', name: 'Capx', category: 'AI', date: '07/2021', x: 'https://x.com/0xCapx', website: 'https://www.capxai.org/', coinvestors: '-' },
    { id: 7, fund: 'Fund I', name: 'Kudo', category: 'Gaming', date: '07/2021', x: 'https://x.com/kudomoney', website: 'https://kudo.money/', coinvestors: 'Gate io' },
    { id: 8, fund: 'Fund I', name: 'Wall', category: 'dApp', date: '09/2021', x: 'https://x.com/walldotapp', website: 'https://www.wall.app/', coinvestors: '-' },
    { id: 9, fund: 'Fund I', name: 'Dopamine', category: 'dApp', date: '09/2021', x: 'https://x.com/myDopamineApp', website: 'https://www.web3intelligence.com/', coinvestors: 'Shima Capital, Gate io' },
    { id: 10, fund: 'Fund I', name: 'City Protocol', category: 'dApp', date: '10/2021', x: 'https://x.com/cityprotocolHQ', website: 'https://www.cityprotocol.co/', coinvestors: 'DragonFly Capital, TRON Foundation, CMT Digital, Mirana Ventures' },
    { id: 11, fund: 'Fund I', name: 'Nitrograph', category: 'Gaming', date: '10/2021', x: 'https://x.com/Nitrograph', website: 'https://nitrograph.com/', coinvestors: 'Outlier Ventures, Canoe Financial' },
    { id: 12, fund: 'Fund I', name: 'MetaPath', category: 'NFT', date: '11/2021', x: 'https://x.com/MetaPath_', website: 'https://metapath.me/', coinvestors: '-' },
    { id: 13, fund: 'Fund I', name: 'Lum', category: 'Layer 1', date: '11/2021', x: 'https://x.com/lum_network', website: 'https://lum.network/', coinvestors: '-' },
    { id: 14, fund: 'Fund I', name: 'Cross the Ages', category: 'Gaming', date: '12/2021', x: 'https://x.com/CrossTheAges', website: 'https://www.crosstheages.com/en-us/', coinvestors: 'Animoca Brands, Morningstar Ventures, Polygon Ventures, Ubisoft Entertainment' },
    { id: 15, fund: 'Fund I', name: 'Maseer', category: 'RWA', date: '12/2021', x: 'https://x.com/DefiMaseer', website: 'https://maseer.finance/', coinvestors: '-' },
    { id: 16, fund: 'Fund I', name: 'MemeCoin Summit', category: 'NFT', date: '12/2021', x: 'https://x.com/MemecoinSummit', website: 'https://memecoinsummit.com/', coinvestors: '-' },
    { id: 17, fund: 'Fund I', name: 'KGeN', category: 'Gaming', date: '12/2021', x: 'https://x.com/KGeN_IO', website: 'https://kgen.io/', coinvestors: 'Animoca Brands, Jump Capital, Accel, Ininity Ventures' },
    { id: 18, fund: 'Fund I', name: 'Kandola', category: 'DePIN', date: '01/2022', x: 'https://x.com/KandolaNetwork', website: 'https://www.kandola.network/', coinvestors: 'Sandeep Nailwal' },
    { id: 19, fund: 'Fund I', name: 'Bril', category: 'DeFi', date: '01/2022', x: 'https://x.com/Cupcake_Hop', website: 'https://www.bril.finance/', coinvestors: '-' },
    { id: 20, fund: 'Fund I', name: 'Mystiko', category: 'Modular', date: '01/2022', x: 'https://x.com/MystikoNetwork', website: 'https://mystiko.network/', coinvestors: 'Hashkey Capital, Morningstar Ventures, Naval Ravikant, Tribe Capital' },
    { id: 21, fund: 'Fund I', name: 'Bitget Wallet', category: 'Wallet', date: '01/2022', x: 'https://x.com/BitgetWallet', website: 'https://web3.bitget.com/en', coinvestors: 'DragonFly Capital, KuCoin Ventures, DHVC, Bitget' },
    { id: 22, fund: 'Fund I', name: 'UNXD', category: 'NFT', date: '02/2022', x: 'https://x.com/UNXD_NFT', website: 'https://unxd.com/', coinvestors: 'Polygon Studios, Morningstar Ventures, Animoca Brands, Bitscale Capital' },
    { id: 23, fund: 'Fund I', name: 'Onomy', category: 'Modular', date: '02/2022', x: 'https://x.com/OnomyProtocol', website: 'https://onomy.io/', coinvestors: 'CMS Holdings, DWF Labs, Ava Labs, Bitfinex' },
    { id: 24, fund: 'Fund I', name: 'Valts', category: 'NFT', date: '02/2022', x: 'n/a', website: 'n/a', coinvestors: '-' },
    { id: 25, fund: 'Fund I', name: 'TallyUP', category: 'Gaming', date: '02/2022', x: 'https://x.com/tallyup', website: 'https://www.tallyup.com/', coinvestors: '-' },
    { id: 26, fund: 'Fund I', name: 'Autonomy', category: 'DeFi', date: '03/2022', x: 'https://x.com/AutonomyHQ', website: 'https://www.autonomy.network/', coinvestors: '-' },
    { id: 27, fund: 'Fund I', name: 'Champions', category: 'Gaming', date: '03/2022', x: 'https://x.com/0xChampions_', website: 'http://www.champions.games/', coinvestors: '-' },
    { id: 28, fund: 'Fund I', name: 'Struct', category: 'DeFi', date: '03/2022', x: 'https://x.com/StructFinance', website: 'https://app.struct.fi/', coinvestors: 'FBG Capital, Double Peak, Wintermute, Infinity Ventures' },
    { id: 29, fund: 'Fund I', name: 'Nudge', category: 'dApp', date: '03/2022', x: 'n/a', website: 'https://getnudgeai.com/', coinvestors: '-' },
    { id: 30, fund: 'Fund I', name: 'Lazygames', category: 'Gaming', date: '03/2022', x: 'https://x.com/LazygamesAi', website: 'https://lazygames.ai/', coinvestors: '-' },
    { id: 31, fund: 'Fund I', name: 'Ex Sports', category: 'Gaming', date: '04/2022', x: 'https://x.com/ExSportsToken', website: 'https://www.ex-sports.io/', coinvestors: '-' },
    { id: 32, fund: 'Fund I', name: 'RFX', category: 'DeFi', date: '04/2022', x: 'https://x.com/RFX_exchange', website: 'https://rfx.exchange/', coinvestors: '-' },
    { id: 33, fund: 'Fund I', name: 'Santa', category: 'dApp', date: '04/2022', x: 'https://x.com/SantaBrowser', website: 'https://www.santabrowser.com/', coinvestors: '-' },
    { id: 34, fund: 'Fund I', name: 'Lucidao', category: 'RWA', date: '04/2022', x: 'https://x.com/Lucidao_', website: 'https://lucidao.com/#/', coinvestors: '-' },
    { id: 35, fund: 'Fund I', name: 'Scribble DAO', category: 'dApp', date: '04/2022', x: 'https://x.com/scribble_dao', website: 'https://scribble.network/', coinvestors: '-' },
    { id: 36, fund: 'Fund I', name: 'Luxo', category: 'RWA', date: '04/2022', x: 'https://x.com/luxochain', website: 'https://luxochain.io/', coinvestors: '-' },
    { id: 37, fund: 'Fund I', name: 'ZED', category: 'dApp', date: '04/2022', x: '-', website: '-', coinvestors: '-' },
    { id: 38, fund: 'Fund I', name: 'Theia Studios', category: 'Gaming', date: '04/2022', x: 'https://x.com/IconsOfTheia', website: 'https://iconsoftheia.com/', coinvestors: 'Hashed Fund, Infinity Ventures' },
    { id: 39, fund: 'Fund I', name: 'PStake', category: 'DeFi', date: '04/2022', x: 'https://x.com/pStakeFinance', website: 'https://pstake.finance/', coinvestors: 'Binance Labs, Sequoia Capital, Coinbase Ventures, Galaxy' },
    { id: 40, fund: 'Fund I', name: 'Reference', category: 'DeFi', date: '04/2022', x: 'n/a', website: 'n/a', coinvestors: '-' },
    { id: 41, fund: 'Fund I', name: 'Revoland', category: 'Gaming', date: '05/2022', x: 'https://x.com/Revo_land', website: 'https://www.revoland.com/#/', coinvestors: 'Hashkey Capital, P2 Ventures' },
    { id: 42, fund: 'Fund I', name: 'ESPL', category: 'Gaming', date: '05/2022', x: 'https://x.com/ESPL_GLOBAL', website: 'https://espl.gg/', coinvestors: '-' },
    { id: 43, fund: 'Fund I', name: 'Puffer', category: 'DeFi', date: '05/2022', x: 'https://x.com/puffer_finance', website: 'https://www.puffer.fi/', coinvestors: 'Coinbase Ventures, Binance Labs, ConsenSys, Electric Capital' },
    { id: 44, fund: 'Fund I', name: 'Vurse', category: 'dApp', date: '05/2022', x: 'https://x.com/vurse_official', website: 'https://vurse.com/', coinvestors: '-' },
    { id: 45, fund: 'Fund I', name: 'PlayZap', category: 'Gaming', date: '05/2022', x: 'https://x.com/PlayZapGames', website: 'https://www.playzap.games/', coinvestors: 'Kucoin Labs' },
    
    { id: 46, fund: 'Fund II', name: 'Babylon', category: 'Programmable Finance & Credit', date: '05/2024', x: 'https://x.com/babylon_chain', website: 'https://babylonchain.io/', coinvestors: 'Polychain Capital, Paradigm' },
    { id: 47, fund: 'Fund II', name: '0G Labs', category: 'Stablecoin Issuance, Settlement & Liquidity', date: '05/2024', x: 'https://x.com/0G_labs', website: 'https://0g.ai/', coinvestors: 'Delphi Ventures, OKX Ventures, Alliance DAO, Hack VC' },
    { id: 48, fund: 'Fund II', name: 'Zircuit', category: 'Stablecoin Issuance, Settlement & Liquidity', date: '05/2024', x: 'https://x.com/ZircuitL2', website: 'https://www.zircuit.com/', coinvestors: 'Binance Labs' },
    { id: 49, fund: 'Fund II', name: 'SatLayer', category: 'Programmable Finance & Credit', date: '08/2024', x: 'https://x.com/satlayer', website: 'https://www.satlayer.xyz/', coinvestors: 'CMS Holdings, OKX Ventures' },
    { id: 50, fund: 'Fund II', name: 'Crosspoint', category: 'Stablecoin Banking & Wallets', date: '12/2024', x: '', website: 'https://www.crosspoint.global/', coinvestors: '-' },
    { id: 51, fund: 'Fund II', name: 'Sati', category: 'Application Layer', date: '12/2024', x: 'https://x.com/heysati', website: 'https://www.sati.pro/', coinvestors: '-' },
    { id: 52, fund: 'Fund II', name: 'HiFi', category: 'Payment Rails & Orchestration', date: '12/2024', x: 'https://x.com/hifibridge', website: 'https://www.hifi.com/', coinvestors: '-' },
    { id: 53, fund: 'Fund II', name: 'Nero', category: 'Payment Rails & Orchestration', date: '01/2025', x: 'https://x.com/Nerochain_io', website: 'https://nerochain.io/', coinvestors: '-' },
    { id: 54, fund: 'Fund II', name: 'Showdown', category: 'Application Layer', date: '01/2025', x: 'https://x.com/showdown_gg', website: 'https://showdown.win/', coinvestors: '-' },
    { id: 55, fund: 'Fund II', name: 'Momentum', category: 'Application Layer', date: '3/2025', x: 'https://x.com/MMTFinance', website: 'https://app.mmt.finance/dashboard', coinvestors: '-' },
    { id: 56, fund: 'Fund II', name: 'Symphony', category: 'Application Layer', date: '3/2025', x: '', website: 'https://x.com/symphonyio', coinvestors: '-' },
    { id: 57, fund: 'Fund II', name: 'OP_NET', category: 'Stablecoin Issuance, Settlement & Liquidity', date: '5/2025', x: 'https://x.com/opnetbtc', website: 'https://opnet.org/', coinvestors: '-' },
    { id: 58, fund: 'Fund II', name: 'GAIB', category: 'Tokenized Assets & Digital Capital Markets', date: '6/2025', x: 'https://x.com/gaib_ai', website: 'https://gaib.ai/', coinvestors: '-' },
    { id: 59, fund: 'Fund II', name: 'DEIN', category: 'Programmable Finance & Credit', date: '10/2025', x: 'https://x.com/DEIN_fi', website: 'https://dein.fi/', coinvestors: '-' },
    { id: 60, fund: 'Fund II', name: 'UTEXO', category: 'Stablecoin Issuance, Settlement & Liquidity', date: '11/2025', x: 'https://x.com/utexocom', website: 'https://utexo.com/', coinvestors: '-' },
    { id: 61, fund: 'Fund II', name: 'TR8DE AI', category: 'Application Layer', date: '12/2025', x: 'https://x.com/tr8deai', website: 'https://tr8de.ai/', coinvestors: '-' },
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
            <div className="col-category">CATEGORY</div>
            <div className="col-date">INVESTMENT DATE</div>
            <div className="col-x">X</div>
            <div className="col-website">WEBSITE</div>
            <div className="col-coinvestors">COINVESTORS</div>
          </div>

          <div className="table-body">
            {filteredTableData.map(item => (
              <div key={item.id} className="table-row">
                <div className="col-name">
                  {item.isImg ? (
                    <img 
                      src={item.icon} 
                      alt={item.name} 
                      className="name-icon-img" 
                    />
                  ) : (
                    <span className="name-icon">{item.name[0]}</span>
                  )}
                  <span className="name-text">{item.name}</span>
                </div>
                <div className="col-category">
                  <span className="category-tag">{item.category}</span>
                </div>
                <div className="col-date">{item.date || '-'}</div>
                <div className="col-x">
                  {item.x && item.x !== 'n/a' && item.x !== '-' ? (
                    <a href={item.x} target="_blank" rel="noopener noreferrer" className="link-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  ) : '-'}
                </div>
                <div className="col-website">
                  {item.website && item.website !== 'n/a' && item.website !== '-' ? (
                    <a href={item.website} target="_blank" rel="noopener noreferrer" className="link-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </a>
                  ) : '-'}
                </div>
                <div className="col-coinvestors">
                  <span className="coinvestors-text">{item.coinvestors || '-'}</span>
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

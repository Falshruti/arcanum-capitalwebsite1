import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Insights.css';
import logocointelegraph from '../assets/news/logocointelegraph.svg';
import forbes from '../assets/news/forbes.svg';
import blockworks from '../assets/news/blockworks.svg';
import business from '../assets/news/business.svg';
import yahoo from '../assets/news/yahoo.svg';
import blockchain from '../assets/news/blockchain.svg';
import coindeck from '../assets/news/coindeck.svg';
import blog1 from '../assets/news/blog1.png';
import blog2 from '../assets/footer/footer-logo.png';
import blog3 from '../assets/news/blog 3.png';
import blog4 from '../assets/news/blog4.png';
import blog5 from '../assets/news/blog5.png';
import blog6 from '../assets/news/blog6.png';
import blog7 from '../assets/news/blog7.png';
import blog8 from '../assets/news/blog8.png';
import blog9 from '../assets/news/blog9.png';
import blog10 from '../assets/news/blog10.png';
import blog11 from '../assets/news/blog11.png';

const insightsData = [
  {
    id: 1,
    title: 'Tether makes first crypto VC fund investment into Arcanum Capital',
    desc: 'Tether, the issuer of the world’s leading stablecoin USDT, has made its first foray into venture capital by investing $2 million in Arcanum Capital’s Arcanum Emerging Technologies Fund II.',
    category: 'News',
    tag: 'News',
    logo: logocointelegraph,
    date: 'February 6, 2024',
    url: 'https://cointelegraph.com/news/tether-makes-first-crypto-vc-investment-arcanum-capital'
  },
  {
    id: 2,
    title: 'How DEIN is Disrupting the Trillion-Dollar Insurance Industry',
    desc: 'Insurance is supposed to be a system built on trust, yet in practice it’s slow, opaque, and often stacked against the people it’s meant to protect.',
    category: 'Blog',
    tag: 'Blog',
    logo: blog1,
    date: 'Jan 7, 2026',
    url: 'https://arcanumcapital.medium.com/how-dein-is-disrupting-the-trillion-dollar-insurance-industry-f7562fa23287'
  },
  {
    id: 3,
    title: 'Arcanum Capital Disrupts Web3 Venture Capital With ‘Circular Economy’',
    desc: 'Arcanum Capital announces today its new Fund II with a focus on web3 and tokenization in partnership with Luganodes.',
    category: 'News',
    tag: 'News',
    logo: forbes,
    date: 'February 7, 2024',
    url: 'https://www.forbes.com/sites/zengernews/2024/02/07/arcanum-capital-disrupts-web3-venture-capital-with-circular-economy/?sh=76a322f543c1'
  },
  {
    id: 4,
    title: 'Why Blockchain, and Why Now?',
    desc: 'Blockchain is the internet’s native settlement layer. It introduces a fundamentally new way to transact with anyone, anywhere, without relying on trust, intermediaries, or legacy financial infrastructure. ',
    category: 'Blog',
    tag: 'Blog',
    logo: blog2,
    date: 'Nov 27, 2025',
    url: 'https://arcanumcapital.medium.com/why-blockchain-and-why-now-0b2a7e328004'
  },
  {
    id: 5,
    title: 'Funding Roundup: $1.34B Invested in Crypto Companies and Funds This Week',
    desc: 'A seed-stage venture capital firm, Arcanum Capital, launched its first fund of $12 million, Wednesday, to focus on blockchain technology companies in emerging markets — mainly in India.',
    category: 'News',
    tag: 'News',
    logo: blockworks,
    date: 'March 4, 2022',
    url: 'https://blockworks.com/news/funding-roundup-1-34b-invested-in-crypto-companies-and-funds-this-week'
  },
  {
    id: 6,
    title: 'A pro-golfer-turned crypto VC who bought bitcoin at $1,800 explains why he\'s launching a fund to focus on blockchain companies in India',
    desc: 'In a big leap from sports to crypto, James McDowall has parlayed his skills as a professional golf player-coach into helping early-stage blockchain projects build, raise, and deploy capital.',
    category: 'News',
    tag: 'News',
    logo: business,
    date: 'March 2, 2022',
    url: 'https://www.businessinsider.com/crypto-projects-metaverse-trading-game-defi-protocol-billionaire-vc-blockchain-2022-3?r=US&IR=T'
  },
  {
    id: 7,
    title: 'Arcanum Capital\'s First Fund Closes Oversubscribed; Investors Include Draper University Ventures and Sandeep Nailwal of Polygon',
    desc: 'Arcanum Capital LLC of Arcanum Emerging Technologies Fund I ISA (the “Fund”) is pleased to announce the final close of its first fund.',
    category: 'News',
    tag: 'News',
    logo: yahoo,
    date: 'March 4, 2022',
    url: 'https://finance.yahoo.com/news/arcanum-capitals-first-fund-closes-140000110.html?guccounter=2'
  },
  {
    id: 8,
    title: 'Blockchain startup Arcana receives funding from Balaji Srinivasan and other angels',
    desc: 'Arcana Network is the storage layer of Ethereum, with a privacy stack for decentralized application developers on Ethereum Virtual Machine-compatible chains.',
    category: 'News',
    tag: 'News',
    logo: logocointelegraph,
    date: 'July 21, 2022',
    url: 'https://cointelegraph.com/press-releases/blockchain-startup-arcana-receives-funding-from-balaji-srinivasan-and-other-angels'
  },
  {
    id: 9,
    title: 'Alpha Innovations and Arcanum Capital Announce the Launch of Arcanum Emerging Technologies Fund I',
    desc: 'Asset management firms Alpha Innovations and Arcanum Capital today announced the launch of the Arcanum Emerging Technologies Fund I on the Alpha Innovations Laureates fund platform.',
    category: 'News',
    tag: 'News',
    logo: blockchain,
    date: 'February 16, 2021',
    url: 'https://www.blockchainwire.io/press-release/alpha-innovations-and-arcanum-capital-announce-the-launch-of-arcanum-emerging-technologies-fund-i'
  },
  {
    id: 10,
    title: 'New Emerging Markets Fund Targets Blockchain, DeFi Startups',
    desc: 'The Arcanum Emerging Technologies Fund will start in India, but its founders plan to expand to other regions.',
    category: 'News',
    tag: 'News',
    logo: coindeck,
    date: 'February 15, 2021',
    url: 'https://www.coindesk.com/markets/2021/02/15/new-emerging-markets-fund-targets-blockchain-defi-startups'
  },
  {
    id: 11,
    title: 'Momentum: From Zero to the Largest DEX on Sui',
    desc: 'Momentum first came across our desk in early 2025 with a vision to bring advanced DEX infrastructure to the Sui ',
    category: 'Blog',
    tag: 'Blog',
    logo: blog3,
    date: 'Sep 13, 2025',
    url: 'https://arcanumcapital.medium.com/momentum-from-zero-to-the-largest-dex-on-sui-c2c8e35c7bd6'
  },
  {
    id: 12,
    title: '2025 Portfolio Review: Arcanum Emerging Technologies Fund II',
    desc: '2025 is shaping up to be one of the most pivotal years in the history of crypto and Web3, arguably the most consequential since the industry’s inception.',
    category: 'Blog',
    tag: 'Blog',
    logo: blog2,
    date: 'Aug 18, 2025',
    url: 'https://arcanumcapital.medium.com/2025-portfolio-review-arcanum-emerging-technologies-fund-ii-b15c73eb2f22'
  },
  {
    id: 13,
    title: 'Stablecoins Are Quietly Reshaping Global Finance',
    desc: 'Stablecoins have garnered significant attention this year, driven by Circle’s IPO (issuer of USDC), the passage of the U.S. GENIUS Act.',
    category: 'Blog',
    tag: 'Blog',
    logo: blog2,
    date: 'Jul 21, 2025',
    url: 'https://arcanumcapital.medium.com/stablecoins-are-quietly-reshaping-global-finance-534057e220e1'
  },
  {
    id: 14,
    title: 'The Internet is Being Rewritten: Santa Browser Holds the Pen',
    desc: 'Web browsers are among the most used apps in the world, yet they’ve seen very little innovation. ',
    category: 'Blog',
    tag: 'Blog',
    logo: blog4,
    date: 'Jun 11, 2025',
    url: 'https://arcanumcapital.medium.com/the-internet-is-being-rewritten-santa-browser-holds-the-pen-5d18981bf51c'
  },
  {
    id: 15,
    title: 'The Home of AI on Blockchain with Capx',
    desc: 'AI is the talk of the town — from Silicon Valley to every corner of the world with an internet connection. One of the most compelling use cases for the large language models leading the AI revolution is the rise of AI agents.',
    category: 'Blog',
    tag: 'Blog',
    logo: blog5,
    date: 'May 12, 2025',
    url: 'https://arcanumcapital.medium.com/the-home-of-ai-on-blockchain-with-capx-9eb7d66ce646'
  },
  {
    id: 15,
    title: 'Babylon Labs and SatLayer',
    desc: 'Since its inception in 2009, Bitcoin has undergone a remarkable transformation, evolving from an obscure experiment in cryptography into a global financial asset.',
    category: 'Blog',
    tag: 'Blog',
    logo: blog2,
    date: 'Apr 10, 2025',
    url: 'https://arcanumcapital.medium.com/the-ecosystem-of-digital-gold-with-babylon-labs-and-satlayer-074e87547cd8'
  },
  {
    id: 16,
    title: 'Unifying the Ethereum Ecosystem with Puffer',
    desc: 'Since its launch in 2015, Ethereum has become one of the world’s leading blockchain platforms. However, as one of the earliest ecosystems and with rapid growth over a short period.',
    category: 'Blog',
    tag: 'Blog',
    logo: blog6,
    date: 'Jan 17, 2025',
    url: 'https://arcanumcapital.medium.com/unifying-the-ethereum-ecosystem-with-puffer-3d8aac9239dd'
  },
  {
    id: 17,
    title: 'Arcanum Emerging Technologies Fund II Investment Thesis by Arcanum Capital',
    desc: 'Hidden behind our screens and buried deep in the code of the internet-enabled tools we use everyday, decentralized blockchain technologies have begun reshaping the fabric of the world we live in. ',
    category: 'Blog',
    tag: 'Blog',
    logo: blog2,
    date: 'Dec 12, 2024',
    url: 'https://arcanumcapital.medium.com/arcanum-emerging-technologies-fund-ii-investment-thesis-by-arcanum-capital-fd102a67c7be'
  },
  {
    id: 18,
    title: 'The First Decentralized AI Operating System by Zero Gravity Labs',
    desc: 'Since ChatGPT took the world by storm in 2022, AI has become a global sensation, captivating attention not only for its remarkable applications but also for the potential risks it poses. ',
    category: 'Blog',
    tag: 'Blog',
    logo: blog7,
    date: 'Nov 12, 2024',
    url: 'https://arcanumcapital.medium.com/the-first-decentralized-ai-operating-system-by-zero-gravity-labs-29b994a2870a'
  },
  {
    id: 19,
    title: 'How Data3 is Unlocking Exclusive Data to Train AI',
    desc: 'Despite the promise and the potential of Artificial Intelligence and Large Language Models, these emerging technologies remain limited by access to the data needed to train them. ',
    category: 'Blog',
    tag: 'Blog',
    logo: blog8,
    date: 'Oct 11, 2024',
    url: 'https://arcanumcapital.medium.com/how-data3-is-unlocking-exclusive-data-to-train-ai-0fded0bf464c'
  },
  {
    id: 20,
    title: 'How pSTAKE Unlocks Bitcoin’s Full Potential',
    desc: 'When considering what the future holds for decentralized finance (DeFi), it is impossible to overlook the role that liquid staking will play in that evolution. ',
    category: 'Blog',
    tag: 'Blog',
    logo: blog9,
    date: 'Sep 24, 2024',
    url: 'https://arcanumcapital.medium.com/how-pstake-unlocks-bitcoins-full-potential-3572e63da50c'
  },
  {
    id: 21,
    title: 'The First Decentralized AI Operating System by Zero Gravity Labs',
    desc: 'Since ChatGPT took the world by storm in 2022, AI has become a global sensation, captivating attention not only for its remarkable applications but also for the potential risks it poses. ',
    category: 'Blog',
    tag: 'Blog',
    logo: blog10,
    date: 'Nov 12, 2024',
    url: 'https://arcanumcapital.medium.com/the-first-decentralized-ai-operating-system-by-zero-gravity-labs-29b994a2870a'
  },
  {
    id: 22,
    title: 'The First Decentralized AI Operating System by Zero Gravity Labs',
    desc: 'Since ChatGPT took the world by storm in 2022, AI has become a global sensation, captivating attention not only for its remarkable applications but also for the potential risks it poses. ',
    category: 'Blog',
    tag: 'Blog',
    logo: blog11,
    date: 'Nov 12, 2024',
    url: 'https://arcanumcapital.medium.com/the-first-decentralized-ai-operating-system-by-zero-gravity-labs-29b994a2870a'
  }
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
                onClick={() => item.url && window.open(item.url, '_blank', 'noopener,noreferrer')}
                style={{ cursor: item.url ? 'pointer' : 'default' }}
              >
              <div className="card-content">
                {/* Card top: logo + date */}
                {(item.logo || item.date) && (
                  <div className="card-top">
                    {item.logo && (
                      <img src={item.logo} alt="Source logo" className="card-logo" />
                    )}
                    {item.date && <span className="card-date">{item.date}</span>}
                  </div>
                )}

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

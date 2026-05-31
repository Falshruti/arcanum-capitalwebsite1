import React from 'react';
import { Link } from 'react-router-dom';
import './InvestmentsStack.css';
import logocointelegraph from '../assets/news/logocointelegraph.svg';
import forbes from '../assets/news/forbes.svg';
import blockworks from '../assets/news/blockworks.svg';
import business from '../assets/news/business.svg';
import blog1 from '../assets/news/blog1.png';
import blog2 from '../assets/footer/footer-logo.png';


const stackItems = [
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
            <div
              key={index}
              className="stack-card"
              onClick={() => item.url && window.open(item.url, '_blank', 'noopener,noreferrer')}
              style={{ cursor: item.url ? 'pointer' : 'default' }}
            >
              <div className="card-content">
                <div className="card-top">
                  {item.logo && <img src={item.logo} alt="Source logo" className="card-logo" />}
                  <span className="card-date">{item.date}</span>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
                <div className="card-footer">
                  <span className="pill-tag">{item.tag}</span>
                </div>
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

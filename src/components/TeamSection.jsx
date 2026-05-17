import React, { useState } from 'react';
import './TeamSection.css';

import jamesImg from '../assets/team/james-mcdowall.png';
import luchangImg from '../assets/team/luchang-zheng.png';
import rahulImg from '../assets/team/rahul-andra.png';
import calebImg from '../assets/team/caleb-august.png';
import lawrenceImg from '../assets/team/lawrence-newhook.png';
import sandeepImg from '../assets/team/sandeep-nailwal.png';
import timImg from '../assets/team/tim-draper.png';
import aniketImg from '../assets/team/aniket-jindal.png';
import auditImg from '../assets/team/audit-one.png';
import dmgImg from '../assets/team/dmg.webp';
import tavisImg from '../assets/team/tavis-capital.webp';
import duv from '../assets/team/duv.webp';
import gcp from '../assets/team/gcp.webp';
import michigan from '../assets/team/michigan-university.webp';
import grandcanyonuniversity from '../assets/team/grand-canyon-university.webp';
import point from '../assets/team/point-72.webp';
import omers from '../assets/team/omers.webp';
import alphainnovations from '../assets/team/alpha-innovations.webp';
import iim from '../assets/team/iim.webp';
import deloitte from '../assets/team/deloitte.webp';
import polygon from '../assets/team/polygon.webp';
import draperassociates from '../assets/team/draper-associates.webp';
import binance from '../assets/team/binance.webp';
import biconomy from '../assets/team/biconomy.webp';


const teamMembers = [
  {
    name: 'James McDowall',
    title: 'Founding Partner',
    img: jamesImg,
    bio: 'Following a career as a professional athlete, James has been researching, investing in and advising early and growth-stage blockchain, Web3 and digital asset companies since 2017. He has played pivotal roles in creative and strategic direction and business development and is experienced in conveying technological solutions to governments, regulators and financial institutions. He gained invaluable alternative asset management knowledge and portfolio management experience during his CAIA studies and tenure with Swiss asset manager Tavis Digital in Zürich, and has sat on the advisory board of the Swiss Impact Investment Association. He Founded Arcanum Capital in 2020 and successfully raised and deployed Arcanum Emerging Technologies Fund I and has managed this successfully over the past 4 years. James excels in leveraging his strong global network of investors, entrepreneurs and capital markets professionals to help finance and scale cutting-edge ventures.',
    companies: [dmgImg, auditImg, tavisImg],
    urlL: 'https://www.linkedin.com/in/james-mcdowall/',
    urlX: ''
  },
  {
    name: 'Luchang Zheng',
    title: 'Founding Partner',
    img: luchangImg,
    bio: 'Luchang is a founding partner of Blockchain Hero, a Global Ambassador of Draper University and a former Partner at GCP, a Silicon Valley focused talent acquisition specialist. She dedicates her passion towards cross-border consulting and investment with portfolios spanning 4 continents, covering blockchain, AI, fintech, big data and IoT. Before starting Blockchain Hero, she was the chief explorer of Robotics and AI at GWC and organiser and producer of the Global Mobile Internet Conference. She also mentors entrepreneurs at MIT LaunchX and Leanin China.',
    companies: [duv, gcp],
    urlL: 'https://www.linkedin.com/in/luciazheng/',
    urlX: 'https://x.com/LuchangArcanum'
  },
  {
    name: 'Rahul Andra',
    title: 'Founding Venture Partner',
    img: rahulImg,
    bio: 'Rahul developed a deep interest in digital assets and digital payments while attending the University of Michigan. Since graduating from Draper University in 2015, Rahuls goal has been to partner with the next generation of entrepreneurs and founders innovating using blockchain and other emerging technologies.',
    companies: [michigan, duv],
    urlL: 'https://www.linkedin.com/in/rahulandra/',
    urlX: ''
  },
  {
    name: 'Caleb August', title: 'Associate', img: calebImg,
    bio: 'Coming from the private equity sector with a focus on commercial real estate redevelopment projects in the United states, Caleb possesses a strong foundation in both traditional finance and alternative investments. Formerly, Caleb was involved with an angle investment group where he advised investors on prospective seed-stage startups. Caleb has been involved in the blockchain and Web3 industry since 2021.',
    companies: [grandcanyonuniversity],
    urlL: 'https://www.linkedin.com/in/calebaugust/',
    urlx: 'https://x.com/bitcaleb'
  },
  {
    name: 'Lawrence Newhook', title: 'Funds Director, Advisor', img: lawrenceImg,
    bio: 'A Director of both Arcanum Emerging Technologies Fund I and Fund II, Lawrence Newhook is a veteran investment professional with a 20+ year track record investing globally across all asset classes. He has built successful investment and hedge fund portfolios for the pension, family office, and high-net-worth investor communities, with a particular focus on identifying and extracting sources of alpha from both public and private markets. Lawrence serves as the President & Chief Investment Officer of Alpha Innovations, where he oversees all facets of the business, including product innovation, alpha identification, and risk management. Before launching Alpha Innovations, Lawrence was a member of the management team at Point72 Asset Management LP for twelve years, where he managed the team responsible for the firm’s external investments in hedge funds, private equity, venture capital, and real estate. His team was also responsible for evaluating all discretionary and quantitative PMs, analysts, and traders to ensure the standard of only hiring best-in-class investment talent. Earlier in his career, Mr. Newhook was the Portfolio Manager of Alternative Strategies for OMERS, one of the largest Canadian pension plans, where he designed, developed, and managed its alternative investments program. Prior to this, he traded international OTC, listed derivatives, and cash markets, and helped manage global derivatives and FX portfolios. Mr. Newhook is a CFA Charterholder and has a Masters in Financial Economics from the University of London and a Bachelor of Commerce (Management Economics) degree from the University of Guelph.',
    companies: [point, omers, alphainnovations],
    urlL: 'https://www.linkedin.com/in/lawrencenewhook/',
    urlx: 'https://x.com/LawrenceNewhook'
  },
  {
    name: 'Sandeep Nailwal', title: 'Advisor', img: sandeepImg,
    bio: 'Sandeep is best known as the Co-Founder of Polygon, a global and sustainable Web3 infrastructure built on Ethereum. After studying computer science, he received his MBA from the National Institute of Industrial Engineering, one of the top schools in India, where he specialized in Information Technology. Sandeep went on to lead the technology department at Welspun, the largest textile company in Asia, and worked as a consultant at Deloitte. Sandeep’s background in tech set the foundation for the 2015 launch of his company, ScopeWeaver, India’s largest marketplace for professional services. It was here that he designed and developed blockchain-based decentralized application architecture. As with many, once Sandeep dipped his toes into the world of Web3, there was no turning back. Just two years later, in 2017, Sandeep, Jaynti Kanani and Anurag Arjun united under a common vision for the future of blockchain tech, and Polygon was born. Currently, Sandeep is based in Dubai, with the support of his 400+ people team that is distributed across India, Dubai, Asia, the USA, and Europe.',
    companies: [iim, deloitte, polygon],
    urlL: '',
    urlx: 'https://x.com/sandeepnailwal'
  },
  {
    name: 'Tim Draper', title: 'Advisor', img: timImg,
    bio: 'Tim Draper founded Draper Associates, DFJ and the Draper Venture Network, a global network of venture capital funds. He funded Baidu, Tesla, Skype, SpaceX, Twitch, Hotmail, Focus Media, Robinhood, Athenahealth, Box, Cruise Automation, Carta, Planet, PTC and 15 other unicorns at the seed stage. Tim is a supporter and global thoughtleader for entrepreneurs, and is a leading spokesperson for Bitcoin, Blockchain, ICOs and cryptocurrencies. He has received various awards and honors including the World Entrepreneurship Forum’s “Entrepreneur of the World,” and is listed as one of the top 100 most powerful people in finance by Worth Magazine, the top 20 most influential people in Crypto by CryptoWeekly.',
    companies: [draperassociates],
    urlL: '',
    urlx: 'https://x.com/TimDraper'
  },
  {
    name: 'Aniket Jindal', title: 'Advisor', img: aniketImg,
    bio: 'Aniket was one of the original 50 employees at Binance, now the world’s largest digital asset exchange by trading volume. He was also the first investor in Matic (now Polygon), which has gone on to surpass a valuation of $20 Billion. A seasoned professional with diversified work experience in marketing, investments, and operations, and known for his versatility and flexibility, Aniket has now co-founded and is currently leading operations at Biconomy, a technology company building transaction infrastructure for next-generation Web3 applications.',
    companies: [binance, polygon, biconomy],
    urlL: 'https://www.linkedin.com/in/aniket-jindal-23894365/',
    UrlX: 'https://x.com/aniket_jindal08'
  }
];

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);

  const openModal = (member) => setSelectedMember(member);
  const closeModal = () => setSelectedMember(null);

  return (
    <section className="team-section container">
      <div className="section-header">
        <h2 className="section-title">Team</h2>
      </div>
      <div className="team-grid">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="team-member" onClick={() => openModal(member)} style={{ cursor: 'pointer' }}>
            <div className="avatar-placeholder">
              {member.img ? (
                <img src={member.img} alt={member.name} className="member-img" />
              ) : (
                <span className="initials">{member.name.split(' ').map(n => n[0]).join('')}</span>
              )}
            </div>
            <div className="member-info">
              <h4 className="member-name">{member.name}</h4>
              <p className="member-title">{member.title}</p>
            </div>
            <div className="member-socials">
              <a href='member.urlL'>
                <span className="icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </span>
              </a>
              <a href='member.urlX'>
                <span className="icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z" /></svg>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {
        selectedMember && (
          <div className="team-modal-overlay" onClick={closeModal}>
            <div className="team-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="team-modal-close" onClick={closeModal}>✕</button>

              <div className="team-modal-header">
                <h2 className="team-modal-name">{selectedMember.name.toUpperCase()}</h2>
                <p className="team-modal-title">{selectedMember.title}</p>
                <span className="team-modal-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </span>
              </div>

              <div className="team-modal-body">
                <p className="team-modal-bio">{selectedMember.bio}</p>
              </div>

              {selectedMember.companies && selectedMember.companies.length > 0 && (
                <div className="team-modal-companies">
                  {selectedMember.companies.map((companyImg, cIdx) => (
                    <img key={cIdx} src={companyImg} alt={`Company ${cIdx}`} className="company-logo-img" />
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      }
    </section >
  );
}

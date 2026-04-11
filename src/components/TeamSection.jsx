import React from 'react';
import './TeamSection.css';

import jamesImg from '../assets/team/james-mcdowall.png';
import luchangImg from '../assets/team/luchang-zheng.png';
import rahulImg from '../assets/team/rahul-andra.png';
import calebImg from '../assets/team/caleb-august.png';
import lawrenceImg from '../assets/team/lawrence-newhook.png';
import sandeepImg from '../assets/team/sandeep-nailwal.png';
import timImg from '../assets/team/tim-draper.png';
import aniketImg from '../assets/team/aniket-jindal.png';

const teamMembers = [
  { name: 'James McDowall', title: 'Founding Partner', img: jamesImg },
  { name: 'Luchang Zheng', title: 'Founding Partner', img: luchangImg },
  { name: 'Rahul Andra', title: 'Founding Venture Partner', img: rahulImg },
  { name: 'Caleb August', title: 'Associate', img: calebImg },
  { name: 'Lawrence Newhook', title: 'Funds Director, Advisor', img: lawrenceImg },
  { name: 'Sandeep Nailwal', title: 'Advisor', img: sandeepImg },
  { name: 'Tim Draper', title: 'Advisor', img: timImg },
  { name: 'Aniket Jindal', title: 'Advisor', img: aniketImg }
];

export default function TeamSection() {
  return (
    <section className="team-section container">
      <div className="section-header">
        <h2 className="section-title">Team</h2>
      </div>
      <div className="team-grid">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="team-member">
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
              <span className="icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </span>
              <span className="icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z" /></svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

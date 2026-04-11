import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="nav-links">
          <a href="#home" className="active">Home</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#team">Team</a>
          <a href="#insights">Insights</a>
          <a href="#nexus">Nexus</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}

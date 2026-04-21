import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Nexus.css';

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Barbuda", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

const nexusCompanies = [
  {
    id: 1,
    name: 'Sati',
    categories: ['Payments', 'Company', 'Wallet'],
    desc: 'Reach out to the us. We review opportunities for both fund and potential partner investments. Please provide your details and we will get back to you shortly.',
    logo: ''
  },
  {
    id: 2,
    name: 'Sati',
    categories: ['Payments', 'Company', 'Wallet'],
    desc: 'Reach out to the us. We review opportunities for both fund and potential partner investments. Please provide your details and we will get back to you shortly.',
    logo: ''
  },
  {
    id: 3,
    name: 'Sati',
    categories: ['Payments', 'Company', 'Wallet'],
    desc: 'Reach out to the us. We review opportunities for both fund and potential partner investments. Please provide your details and we will get back to you shortly.',
    logo: ''
  },
  {
    id: 4,
    name: 'Sati',
    categories: ['Payments', 'Company', 'Wallet'],
    desc: 'Reach out to the us. We review opportunities for both fund and potential partner investments. Please provide your details and we will get back to you shortly.',
    logo: ''
  }
];

const sectors = [
  'Custody',
  'On/Off-ramp',
  'Neobank',
  'Payment Orchestration',
  'Exchange',
  'Wallets',
  'Finance'
];

const quickTags = ['Exchange', 'Wallets', 'Payment Orchestration', 'Neobank', 'On/Off-ramp'];

export default function Nexus() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickTag, setActiveQuickTag] = useState(null);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const toggleSector = (sector) => {
    setSelectedSectors(prev => 
      prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
    );
  };

  const filteredCompanies = nexusCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesQuickTag = !activeQuickTag || company.categories.includes(activeQuickTag);
    // For now simple filtering, can be expanded
    return matchesSearch && matchesQuickTag;
  });

  return (
    <div className="nexus-page">
      {/* Hero Search Section */}
      <section className="nexus-hero">
        <div className="nexus-grid-bg"></div>
        <div className="container">
          <motion.div 
            className="nexus-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="nexus-main-title">
              Discover <span className="highlight-text">stablecoin-powered companies</span> around the world.
            </h1>
            <a href="/submit-profile" className="submit-profile-link">
              Are you a business? Submit your profile <span className="arrow">→</span>
            </a>

            <div className="search-container">
              <div className="search-bar-wrapper">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search exchanges, merchants, wallets, or products..."
                  className="nexus-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="quick-tags">
                {quickTags.map(tag => (
                  <button 
                    key={tag}
                    className={`tag-pill ${activeQuickTag === tag ? 'active' : ''}`}
                    onClick={() => setActiveQuickTag(activeQuickTag === tag ? null : tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Directory Section */}
      <section className="nexus-directory">
        <div className="container">
          <div className="directory-layout">
            
            {/* Sidebar Filters - Desktop */}
            <aside className="directory-sidebar">
              <div className="filter-box">
                <h3 className="filter-label">Profile Sectors</h3>
                <div className="filter-options">
                  {sectors.map(sector => (
                    <label key={sector} className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={selectedSectors.includes(sector)}
                        onChange={() => toggleSector(sector)}
                      />
                      <span className="checkmark"></span>
                      {sector}
                    </label>
                  ))}
                  {/* Duplicate Finance for mock accuracy */}
                  <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span>Finance</label>
                  <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span>Finance</label>
                  <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span>Finance</label>
                </div>

                <div className="dropdown-filters">
                  <div className="filter-group">
                    <label>Country</label>
                    <select className="nexus-select">
                      <option>All countries</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Sort By</label>
                    <select className="nexus-select">
                      <option>Relevance</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Filters Toggle */}
            <div className="mobile-filters-trigger">
              <button 
                className="mobile-filter-btn"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              >
                Filters
                <svg className={`chevron ${isMobileFiltersOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isMobileFiltersOpen && (
                  <motion.div 
                    className="mobile-filters-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="filter-box">
                      <h3 className="filter-label">Profile Sectors</h3>
                      <div className="filter-options">
                        {sectors.map(sector => (
                          <label key={sector} className="checkbox-container">
                            <input 
                              type="checkbox" 
                              checked={selectedSectors.includes(sector)}
                              onChange={() => toggleSector(sector)}
                            />
                            <span className="checkmark"></span>
                            {sector}
                          </label>
                        ))}
                        <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span>Finance</label>
                        <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span>Finance</label>
                        <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span>Finance</label>
                      </div>

                      <div className="dropdown-filters">
                        <div className="filter-group">
                          <label>Country</label>
                          <select className="nexus-select">
                            <option>All countries</option>
                            {countries.map(country => (
                              <option key={country} value={country}>{country}</option>
                            ))}
                          </select>
                        </div>
                        <div className="filter-group">
                          <label>Sort By</label>
                          <select className="nexus-select">
                            <option>Relevance</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content Area */}
            <main className="directory-main">
              <div className="results-list">
                {filteredCompanies.map((company, idx) => (
                  <motion.div 
                    key={`${company.id}-${idx}`}
                    className="company-card"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="card-top">
                      <div className="company-logo-circle"></div>
                      <div className="company-header-info">
                        <div className="title-row">
                          <h2 className="company-name">{company.name}</h2>
                          <button className="view-profile-btn desktop-only">View Profile</button>
                        </div>
                        <div className="company-tags">
                          {company.categories.map(cat => (
                            <span key={cat} className="category-tag">{cat}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="company-desc">{company.desc}</p>
                      <button className="view-profile-btn mobile-only">View Profile</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </main>

          </div>
        </div>
      </section>
    </div>
  );
}

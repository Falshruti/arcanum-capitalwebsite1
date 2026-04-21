import React from 'react';
import { motion } from 'framer-motion';
import './SubmitProfile.css';

export default function SubmitProfile() {
  return (
    <div className="submit-profile-page">
      <div className="nexus-grid-bg"></div>
      
      <div className="container">
        <motion.div 
          className="sp-form-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="sp-form-header">
            <h1 className="sp-form-title">Submit a Profile</h1>
            <p className="sp-form-subtitle">Request a new profile and we'll create it for you.</p>
          </div>

          <form className="sp-profile-form">
            <div className="sp-form-row">
              <div className="sp-form-group">
                <label>Name</label>
                <input type="text" placeholder="Company name" />
              </div>
            </div>

            <div className="sp-form-row">
              <div className="sp-form-group">
                <label>Profile Domain</label>
                <input type="text" placeholder="company.com" />
              </div>
            </div>

            <div className="sp-form-row">
              <div className="sp-form-group">
                <label>Profile Description</label>
                <textarea placeholder="Brief description of your profile..." rows="4"></textarea>
              </div>
            </div>

            <div className="sp-form-row sp-dual-row">
              <div className="sp-form-group">
                <label>Profile Size</label>
                <select className="sp-form-select">
                  <option value="">Select size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
              <div className="sp-form-group">
                <label>Industry</label>
                <select className="sp-form-select">
                  <option value="">Select industry</option>
                  <option value="fintech">Fintech</option>
                  <option value="web3">Web3</option>
                  <option value="saas">SaaS</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="sp-form-row">
              <div className="sp-form-group">
                <label>Job Title</label>
                <select className="sp-form-select">
                  <option value="">Select job title</option>
                  <option value="founder">Founder / CEO</option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="sp-form-row">
              <div className="sp-form-group">
                <label>Why do you need a profile?</label>
                <textarea placeholder="Please explain why you're requesting a new profile..." rows="4"></textarea>
              </div>
            </div>

            <div className="sp-form-row">
              <div className="sp-form-group">
                <label>Telegram</label>
                <input type="text" placeholder="@companyadmin" />
              </div>
            </div>

            <button type="submit" className="sp-form-submit-btn">
              Submit Request <span className="arrow">→</span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

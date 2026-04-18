import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    telegram: '',
    company: '',
    links: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <div className="container contact-container">
        <motion.div 
          className="contact-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Column: Content */}
          <div className="contact-info">
            <h1 className="contact-title">Contact</h1>
            <p className="contact-desc">
              Reach out us. We review opportunities for both fund and potential partner investments. 
              Please provide your details and we will get back to you shortly.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Telegram</label>
                <input 
                  type="text" 
                  name="telegram" 
                  value={formData.telegram} 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input 
                  type="text" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group">
                <label>Links</label>
                <textarea 
                  name="links" 
                  rows="4" 
                  value={formData.links} 
                  onChange={handleChange} 
                ></textarea>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

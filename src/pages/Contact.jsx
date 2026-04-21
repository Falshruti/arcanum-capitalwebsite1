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

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true });

    try {
      const response = await fetch('https://formspree.io/f/falshrutibalsaraf007@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ submitting: false, submitted: true, error: null });
        setFormData({
          fullName: '',
          email: '',
          telegram: '',
          company: '',
          links: '',
          message: ''
        });
      } else {
        // Formspree returns an array of errors in some cases
        const errorMessage = data.errors
          ? data.errors.map(e => e.message).join(', ')
          : 'Form submission failed. Please ensure the form is activated.';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('Formspree Error:', err);
      setStatus({
        submitting: false,
        submitted: false,
        error: err.message || 'Oops! There was a problem submitting your form.'
      });
    }
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
            {status.submitted ? (
              <motion.div
                className="contact-success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3>Thank you!</h3>
                <p>Your message has been sent successfully. We will get back to you shortly.</p>
                <button className="contact-submit-btn" onClick={() => setStatus({ ...status, submitted: false })}>
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-group">
                  <label>NAME</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <label>TELEGRAM</label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form-group">
                  <label>COMAPANY</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form-group">
                  <label>TOPIC OF INTEREST</label>
                  <textarea
                    name="links"
                    rows="4"
                    value={formData.links}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="contact-form-group">
                  <label>MESSAGE</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {status.error && <p className="contact-error-message">{status.error}</p>}

                <button type="submit" className="contact-submit-btn" disabled={status.submitting}>
                  {status.submitting ? 'Sending...' : 'Submit'}
                  <span className="arrow-icon">→</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

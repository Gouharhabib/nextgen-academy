import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contacts', form);
      toast.success('Message sent successfully! We will get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to send message');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with us for any queries or admissions</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>
                Have questions about our courses or admissions? We'd love to hear
                from you. Fill out the form or reach us through the contact details below.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon"><FaPhone /></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><FaEnvelope /></div>
                  <div>
                    <h4>Email</h4>
                    <p>info@nextgenacademy.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><FaMapMarkerAlt /></div>
                  <div>
                    <h4>Address</h4>
                    <p>123, Education Lane, Knowledge City, 400001</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><FaClock /></div>
                  <div>
                    <h4>Working Hours</h4>
                    <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="Admission Inquiry" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Write your message here..." rows={5}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

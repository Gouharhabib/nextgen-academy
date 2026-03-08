import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>NextGen <span>Academy</span></h2>
            <p>
              Empowering students with quality education and personalized learning
              experiences. Building tomorrow's leaders through excellence in teaching.
            </p>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h3>Courses</h3>
            <Link to="/courses">Mathematics</Link>
            <Link to="/courses">Science</Link>
            <Link to="/courses">English</Link>
            <Link to="/courses">Physics</Link>
          </div>

          <div className="footer-col">
            <h3>Contact Info</h3>
            <p><FaPhone style={{ marginRight: '8px' }} /> +91 98765 43210</p>
            <p><FaEnvelope style={{ marginRight: '8px' }} /> info@nextgenacademy.com</p>
            <p><FaMapMarkerAlt style={{ marginRight: '8px' }} /> 123, Education Lane, Knowledge City</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NextGen Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

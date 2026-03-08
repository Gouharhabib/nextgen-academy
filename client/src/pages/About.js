import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaChalkboardTeacher, FaUsers, FaTrophy, FaLaptop, FaBookOpen, FaClock } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>About NextGen Academy</h1>
          <p>Shaping futures through quality education since 2015</p>
        </div>
      </div>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <div className="about-image-card">
                <div className="big-number">10+</div>
                <p>Years of Excellence in Education</p>
              </div>
            </div>
            <div className="about-content">
              <h2>Welcome to NextGen Academy</h2>
              <p>
                NextGen Academy was founded in 2015 with a vision to provide
                quality education that goes beyond textbooks. We believe every
                student has the potential to excel, and our mission is to unlock
                that potential through innovative teaching methods and personalized
                attention.
              </p>
              <p>
                Our team of experienced educators is committed to providing
                comprehensive coaching that prepares students not just for exams,
                but for life. We follow a structured approach combining conceptual
                understanding with practical application.
              </p>
              <ul className="about-list">
                <li>
                  <span className="check-icon"><FaCheckCircle /></span>
                  CBSE, ICSE & State Board curriculum covered
                </li>
                <li>
                  <span className="check-icon"><FaCheckCircle /></span>
                  Regular parent-teacher meetings
                </li>
                <li>
                  <span className="check-icon"><FaCheckCircle /></span>
                  Weekly tests and performance analysis
                </li>
                <li>
                  <span className="check-icon"><FaCheckCircle /></span>
                  Doubt clearing sessions every Saturday
                </li>
                <li>
                  <span className="check-icon"><FaCheckCircle /></span>
                  Digital learning resources provided
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #1a237e, #0d47a1)', color: 'white' }}>
        <div className="container">
          <div className="features-grid">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#ff6f00' }}>1000+</div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Happy Students</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#ff6f00' }}>50+</div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Expert Teachers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#ff6f00' }}>20+</div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Courses Offered</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#ff6f00' }}>95%</div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Approach */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Teaching Approach</h2>
            <p>A systematic methodology that ensures deep understanding and exam readiness</p>
            <div className="underline"></div>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon"><FaBookOpen /></div>
              <h3>Conceptual Learning</h3>
              <p>Focus on understanding fundamentals, not rote memorization. We build strong foundations first.</p>
            </div>
            <div className="feature-card">
              <div className="icon"><FaChalkboardTeacher /></div>
              <h3>Interactive Classes</h3>
              <p>Engaging classroom sessions with discussions, Q&A, and real-world examples.</p>
            </div>
            <div className="feature-card">
              <div className="icon"><FaTrophy /></div>
              <h3>Regular Assessments</h3>
              <p>Weekly tests, mock exams, and detailed performance analytics to track progress.</p>
            </div>
            <div className="feature-card">
              <div className="icon"><FaLaptop /></div>
              <h3>Digital Resources</h3>
              <p>Access to online study materials, video lessons, and practice tests for self-study.</p>
            </div>
            <div className="feature-card">
              <div className="icon"><FaUsers /></div>
              <h3>Mentorship Program</h3>
              <p>One-on-one mentoring for students who need extra guidance and motivation.</p>
            </div>
            <div className="feature-card">
              <div className="icon"><FaClock /></div>
              <h3>Flexible Timing</h3>
              <p>Multiple batch timings available to accommodate different school schedules.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#f3f4f6', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', color: '#1a237e', marginBottom: '15px' }}>Start Your Journey Today</h2>
          <p style={{ color: '#6b7280', marginBottom: '25px', maxWidth: '500px', margin: '0 auto 25px' }}>
            Join NextGen Academy and experience the difference quality education can make.
          </p>
          <Link to="/courses" className="btn btn-primary">Explore Our Courses</Link>
        </div>
      </section>
    </>
  );
};

export default About;

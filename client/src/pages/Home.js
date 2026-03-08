import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaTrophy, FaCheckCircle, FaClock, FaUserTie, FaRupeeSign, FaCalendarAlt, FaStar } from 'react-icons/fa';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, testimonialsRes] = await Promise.all([
          axios.get('/api/courses'),
          axios.get('/api/testimonials'),
        ]);
        setCourses(coursesRes.data.slice(0, 3));
        setTestimonials(testimonialsRes.data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">🎓 #1 Tuition Center in the City</div>
            <h1>
              Unlock Your <span>Academic</span> Potential with <span>NextGen Academy</span>
            </h1>
            <p>
              We provide personalized coaching and expert guidance to help students
              excel in their academics. Join thousands of successful students who
              transformed their grades with us.
            </p>
            <div className="hero-buttons">
              <Link to="/courses" className="btn btn-secondary">Explore Courses</Link>
              <Link to="/about" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Learn More</Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Students</div>
              </div>
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Expert Teachers</div>
              </div>
              <div className="stat">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="card-icon"><FaGraduationCap /></div>
              <h3>Why NextGen Academy?</h3>
              <p>We don't just teach — we mentor, inspire, and transform.</p>
              <div className="hero-features">
                <div className="feature">
                  <div className="feature-icon"><FaCheckCircle /></div>
                  <span>Expert Faculty with 10+ years experience</span>
                </div>
                <div className="feature">
                  <div className="feature-icon"><FaCheckCircle /></div>
                  <span>Small batch sizes for personal attention</span>
                </div>
                <div className="feature">
                  <div className="feature-icon"><FaCheckCircle /></div>
                  <span>Regular tests & performance tracking</span>
                </div>
                <div className="feature">
                  <div className="feature-icon"><FaCheckCircle /></div>
                  <span>Doubt clearing sessions included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us?</h2>
            <p>We provide comprehensive learning solutions designed to bring out the best in every student</p>
            <div className="underline"></div>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon"><FaChalkboardTeacher /></div>
              <h3>Expert Faculty</h3>
              <p>Highly qualified and experienced teachers dedicated to student success with proven track records.</p>
            </div>
            <div className="feature-card">
              <div className="icon"><FaUsers /></div>
              <h3>Small Batches</h3>
              <p>Limited students per batch ensuring personalized attention and interactive learning environment.</p>
            </div>
            <div className="feature-card">
              <div className="icon"><FaTrophy /></div>
              <h3>Proven Results</h3>
              <p>95% of our students consistently score above 90% in board exams and competitive tests.</p>
            </div>
            <div className="feature-card">
              <div className="icon"><FaGraduationCap /></div>
              <h3>Comprehensive Curriculum</h3>
              <p>Well-structured study material covering CBSE, ICSE, and State Board syllabi with exam strategies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Popular Courses</h2>
            <p>Explore our most sought-after courses designed for academic excellence</p>
            <div className="underline"></div>
          </div>
          <div className="courses-grid">
            {courses.map(course => (
              <div className="course-card" key={course._id}>
                <div className="course-card-header">
                  <span className="subject-badge">{course.subject}</span>
                  <h3>{course.title}</h3>
                  <p className="grade">{course.grade}</p>
                </div>
                <div className="course-card-body">
                  <p>{course.description}</p>
                  <div className="course-info">
                    <div className="course-info-item">
                      <FaUserTie className="info-icon" />
                      <span>{course.teacher}</span>
                    </div>
                    <div className="course-info-item">
                      <FaClock className="info-icon" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="course-info-item">
                      <FaCalendarAlt className="info-icon" />
                      <span>{course.schedule}</span>
                    </div>
                  </div>
                  <div className="course-card-footer">
                    <div className="course-price">
                      <FaRupeeSign />{course.fee} <span>/course</span>
                    </div>
                    <Link to={`/enroll/${course._id}`} className="btn btn-primary btn-sm">Enroll Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/courses" className="btn btn-outline">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section testimonials">
          <div className="container">
            <div className="section-title">
              <h2>What Students Say</h2>
              <p>Hear from our students who have achieved academic excellence with us</p>
              <div className="underline"></div>
            </div>
            <div className="testimonials-grid">
              {testimonials.map(t => (
                <div className="testimonial-card" key={t._id}>
                  <div className="quote">"</div>
                  <p className="text">{t.text}</p>
                  <div className="stars">
                    {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <div className="student-info">
                    <div className="student-avatar">{t.studentName[0]}</div>
                    <div>
                      <div className="student-name">{t.studentName}</div>
                      <div className="student-grade">{t.grade}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #1a237e, #0d47a1)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Ready to Excel?</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
            Join NextGen Academy today and take the first step towards academic excellence.
            Limited seats available!
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Link to="/courses" className="btn btn-secondary">Browse Courses</Link>
            <Link to="/contact" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

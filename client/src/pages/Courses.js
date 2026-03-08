import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserTie, FaClock, FaCalendarAlt, FaRupeeSign, FaUsers } from 'react-icons/fa';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        setCourses(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Error fetching courses');
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const subjects = ['All', ...new Set(courses.map(c => c.subject))];

  const filterCourses = (subject) => {
    setActiveFilter(subject);
    setFiltered(subject === 'All' ? courses : courses.filter(c => c.subject === subject));
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading courses...</div>;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Our Courses</h1>
          <p>Explore our wide range of courses designed for academic excellence</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
            {subjects.map(s => (
              <button
                key={s}
                className={`btn btn-sm ${activeFilter === s ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => filterCourses(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="courses-grid">
            {filtered.map(course => (
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
                    <div className="course-info-item">
                      <FaUsers className="info-icon" />
                      <span>{course.enrolledCount}/{course.maxStudents} students</span>
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

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              <p>No courses found for this subject.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Enroll = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    studentName: '', email: '', phone: '', parentName: '', parentPhone: '', grade: '', address: ''
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}`);
        setCourse(res.data);
      } catch {
        toast.error('Course not found');
        navigate('/courses');
      }
      setLoading(false);
    };
    fetchCourse();
  }, [courseId, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('/api/enrollments', { ...form, course: courseId });
      toast.success('Enrollment submitted successfully! We will contact you soon.');
      navigate('/courses');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Enrollment failed');
    }
    setSubmitting(false);
  };

  if (loading) return <div className="loading" style={{ paddingTop: '120px' }}><div className="spinner"></div>Loading...</div>;

  return (
    <div className="enrollment-page">
      <div className="container">
        <div className="enrollment-form-container">
          <h2>Enrollment Form</h2>
          {course && (
            <div style={{ background: '#f3f4f6', borderRadius: '8px', padding: '15px', marginBottom: '25px', textAlign: 'center' }}>
              <h3 style={{ color: '#1a237e', marginBottom: '5px' }}>{course.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{course.subject} | {course.grade} | Fee: ₹{course.fee}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Student Name *</label>
                <input type="text" name="studentName" value={form.studentName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Grade/Class *</label>
                <select name="grade" value={form.grade} onChange={handleChange} required>
                  <option value="">Select Grade</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Parent/Guardian Name *</label>
                <input type="text" name="parentName" value={form.parentName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Parent Phone *</label>
                <input type="tel" name="parentPhone" value={form.parentPhone} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="Enter your address"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%' }}>
              {submitting ? 'Submitting...' : 'Submit Enrollment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enroll;

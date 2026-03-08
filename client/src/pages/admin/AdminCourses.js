import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminSidebar from '../../components/AdminSidebar';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '', subject: '', grade: '', teacher: '',
    duration: '', schedule: '', fee: '', maxStudents: 30, isActive: true
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses/all');
      setCourses(res.data);
    } catch (err) {
      toast.error('Failed to fetch courses');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const openAddModal = () => {
    setEditing(null);
    setForm({ title: '', description: '', subject: '', grade: '', teacher: '', duration: '', schedule: '', fee: '', maxStudents: 30, isActive: true });
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditing(course._id);
    setForm({
      title: course.title, description: course.description, subject: course.subject,
      grade: course.grade, teacher: course.teacher, duration: course.duration,
      schedule: course.schedule, fee: course.fee, maxStudents: course.maxStudents, isActive: course.isActive
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/api/courses/${editing}`, form);
        toast.success('Course updated');
      } else {
        await axios.post('/api/courses', form);
        toast.success('Course created');
      }
      setShowModal(false);
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`/api/courses/${id}`);
      toast.success('Course deleted');
      fetchCourses();
    } catch (err) {
      toast.error('Failed to delete course');
    }
  };

  if (loading) return <div className="loading" style={{ paddingTop: '120px' }}><div className="spinner"></div>Loading...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Manage Courses</h3>
            <button className="btn btn-primary btn-sm" onClick={openAddModal}>
              <FaPlus /> Add Course
            </button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Teacher</th>
                <th>Fee</th>
                <th>Students</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c._id}>
                  <td style={{ fontWeight: 500, color: '#1a1a2e' }}>{c.title}</td>
                  <td>{c.subject}</td>
                  <td>{c.grade}</td>
                  <td>{c.teacher}</td>
                  <td>₹{c.fee}</td>
                  <td>{c.enrolledCount}/{c.maxStudents}</td>
                  <td>
                    <span className={`badge ${c.isActive ? 'badge-approved' : 'badge-rejected'}`}>
                      {c.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => openEditModal(c)} style={{ marginRight: '5px' }}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2>{editing ? 'Edit Course' : 'Add New Course'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Title *</label>
                    <input type="text" name="title" value={form.title} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description *</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required rows={3}></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Grade *</label>
                    <input type="text" name="grade" value={form.grade} onChange={handleChange} required placeholder="e.g. Grade 9-10" />
                  </div>
                  <div className="form-group">
                    <label>Teacher *</label>
                    <input type="text" name="teacher" value={form.teacher} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration *</label>
                    <input type="text" name="duration" value={form.duration} onChange={handleChange} required placeholder="e.g. 6 months" />
                  </div>
                  <div className="form-group">
                    <label>Schedule *</label>
                    <input type="text" name="schedule" value={form.schedule} onChange={handleChange} required placeholder="e.g. Mon, Wed, Fri - 4PM" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Fee (₹) *</label>
                    <input type="number" name="fee" value={form.fee} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Max Students</label>
                    <input type="number" name="maxStudents" value={form.maxStudents} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                    Active Course
                  </label>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">{editing ? 'Update' : 'Create'} Course</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;

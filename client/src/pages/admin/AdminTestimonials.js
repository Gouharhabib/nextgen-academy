import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminSidebar from '../../components/AdminSidebar';
import { FaCheck, FaTimes, FaTrash, FaStar } from 'react-icons/fa';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('/api/testimonials/all');
      setTestimonials(res.data);
    } catch (err) {
      toast.error('Failed to fetch testimonials');
    }
    setLoading(false);
  };

  const toggleApproval = async (id, isApproved) => {
    try {
      await axios.put(`/api/testimonials/${id}/approve`, { isApproved });
      toast.success(isApproved ? 'Testimonial approved' : 'Testimonial hidden');
      fetchTestimonials();
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await axios.delete(`/api/testimonials/${id}`);
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="loading" style={{ paddingTop: '120px' }}><div className="spinner"></div>Loading...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-card">
          <h3>Manage Testimonials</h3>
          {testimonials.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Grade</th>
                  <th>Testimonial</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map(t => (
                  <tr key={t._id}>
                    <td style={{ fontWeight: 500, color: '#1a1a2e' }}>{t.studentName}</td>
                    <td>{t.grade}</td>
                    <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.text}</td>
                    <td>
                      <span style={{ color: '#ff6f00' }}>
                        {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${t.isApproved ? 'badge-approved' : 'badge-pending'}`}>
                        {t.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td>
                      {t.isApproved ? (
                        <button className="btn btn-sm btn-outline" onClick={() => toggleApproval(t._id, false)} style={{ marginRight: '5px' }}>
                          <FaTimes /> Hide
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-success" onClick={() => toggleApproval(t._id, true)} style={{ marginRight: '5px' }}>
                          <FaCheck /> Approve
                        </button>
                      )}
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#6b7280', padding: '20px 0' }}>No testimonials yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonials;

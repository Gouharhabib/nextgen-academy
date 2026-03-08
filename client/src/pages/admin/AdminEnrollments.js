import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminSidebar from '../../components/AdminSidebar';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get('/api/enrollments');
      setEnrollments(res.data);
    } catch (err) {
      toast.error('Failed to fetch enrollments');
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/enrollments/${id}/status`, { status });
      toast.success(`Enrollment ${status}`);
      fetchEnrollments();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="loading" style={{ paddingTop: '120px' }}><div className="spinner"></div>Loading...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-card">
          <h3>Student Enrollments</h3>
          {enrollments.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Grade</th>
                  <th>Parent</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map(e => (
                  <tr key={e._id}>
                    <td style={{ fontWeight: 500, color: '#1a1a2e' }}>{e.studentName}</td>
                    <td>{e.email}</td>
                    <td>{e.phone}</td>
                    <td>{e.course?.title || 'N/A'}</td>
                    <td>{e.grade}</td>
                    <td>{e.parentName}</td>
                    <td><span className={`badge badge-${e.status}`}>{e.status}</span></td>
                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td>
                      {e.status === 'pending' && (
                        <>
                          <button className="btn btn-sm btn-success" onClick={() => updateStatus(e._id, 'approved')} style={{ marginRight: '5px' }}>
                            <FaCheck />
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => updateStatus(e._id, 'rejected')}>
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#6b7280', padding: '20px 0' }}>No enrollments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEnrollments;

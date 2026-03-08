import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';
import { FaBook, FaUserGraduate, FaEnvelope, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats');
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <div className="loading" style={{ paddingTop: '120px' }}><div className="spinner"></div>Loading...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h2 style={{ marginBottom: '25px', color: '#1a237e' }}>Dashboard Overview</h2>

        {stats && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue"><FaBook /></div>
                <div>
                  <div className="stat-number">{stats.totalCourses}</div>
                  <div className="stat-label">Active Courses</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orange"><FaUserGraduate /></div>
                <div>
                  <div className="stat-number">{stats.totalEnrollments}</div>
                  <div className="stat-label">Total Enrollments</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green"><FaUsers /></div>
                <div>
                  <div className="stat-number">{stats.pendingEnrollments}</div>
                  <div className="stat-label">Pending Approvals</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon cyan"><FaEnvelope /></div>
                <div>
                  <div className="stat-number">{stats.unreadContacts}</div>
                  <div className="stat-label">Unread Messages</div>
                </div>
              </div>
            </div>

            <div className="admin-card">
              <h3>Recent Enrollments</h3>
              {stats.recentEnrollments.length > 0 ? (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentEnrollments.map(e => (
                      <tr key={e._id}>
                        <td>{e.studentName}</td>
                        <td>{e.course?.title || 'N/A'}</td>
                        <td><span className={`badge badge-${e.status}`}>{e.status}</span></td>
                        <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: '#6b7280' }}>No enrollments yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

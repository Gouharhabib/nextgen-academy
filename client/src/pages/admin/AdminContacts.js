import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminSidebar from '../../components/AdminSidebar';
import { FaEye, FaTrash } from 'react-icons/fa';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      setContacts(res.data);
    } catch (err) {
      toast.error('Failed to fetch messages');
    }
    setLoading(false);
  };

  const markAsRead = async (contact) => {
    if (!contact.isRead) {
      try {
        await axios.put(`/api/contacts/${contact._id}/read`);
        fetchContacts();
      } catch (err) {
        console.error('Failed to mark as read');
      }
    }
    setSelectedContact(contact);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`/api/contacts/${id}`);
      toast.success('Message deleted');
      setSelectedContact(null);
      fetchContacts();
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
          <h3>Contact Messages</h3>
          {contacts.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c._id} style={{ fontWeight: c.isRead ? 400 : 600 }}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.subject}</td>
                    <td>
                      <span className={`badge ${c.isRead ? 'badge-approved' : 'badge-unread'}`}>
                        {c.isRead ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={() => markAsRead(c)} style={{ marginRight: '5px' }}>
                        <FaEye />
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#6b7280', padding: '20px 0' }}>No messages yet.</p>
          )}
        </div>

        {/* View Message Modal */}
        {selectedContact && (
          <div className="modal-overlay" onClick={() => setSelectedContact(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2>Message Details</h2>
              <div style={{ marginBottom: '15px' }}>
                <strong>From:</strong> {selectedContact.name} ({selectedContact.email})
              </div>
              {selectedContact.phone && (
                <div style={{ marginBottom: '15px' }}>
                  <strong>Phone:</strong> {selectedContact.phone}
                </div>
              )}
              <div style={{ marginBottom: '15px' }}>
                <strong>Subject:</strong> {selectedContact.subject}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Message:</strong>
                <p style={{ marginTop: '5px', color: '#6b7280', lineHeight: 1.7 }}>{selectedContact.message}</p>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                Received: {new Date(selectedContact.createdAt).toLocaleString()}
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline btn-sm" onClick={() => setSelectedContact(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;

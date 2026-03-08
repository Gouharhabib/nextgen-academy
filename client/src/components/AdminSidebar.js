import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBook, FaUserGraduate, FaEnvelope, FaStar } from 'react-icons/fa';

const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <Link to="/admin" className={isActive('/admin')}>
        <FaTachometerAlt /> Dashboard
      </Link>
      <Link to="/admin/courses" className={isActive('/admin/courses')}>
        <FaBook /> Courses
      </Link>
      <Link to="/admin/enrollments" className={isActive('/admin/enrollments')}>
        <FaUserGraduate /> Enrollments
      </Link>
      <Link to="/admin/contacts" className={isActive('/admin/contacts')}>
        <FaEnvelope /> Messages
      </Link>
      <Link to="/admin/testimonials" className={isActive('/admin/testimonials')}>
        <FaStar /> Testimonials
      </Link>
    </div>
  );
};

export default AdminSidebar;

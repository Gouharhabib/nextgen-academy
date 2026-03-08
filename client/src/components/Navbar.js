import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGraduationCap } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <div className="logo-icon"><FaGraduationCap /></div>
          <h1>NextGen <span>Academy</span></h1>
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/courses" className={isActive('/courses')} onClick={() => setMenuOpen(false)}>Courses</Link>
          <Link to="/about" className={isActive('/about')} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className={isActive('/contact')} onClick={() => setMenuOpen(false)}>Contact</Link>
          {user ? (
            <>
              {isAdmin && <Link to="/admin" className={location.pathname.startsWith('/admin') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Dashboard</Link>}
              <button className="btn btn-outline btn-sm" onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="btn btn-primary btn-sm">Login</button>
            </Link>
          )}
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

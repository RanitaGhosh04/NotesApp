import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Notes App</Link>
        <ul className="navbar-menu">
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              </li>
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link">Profile</Link>
              </li>
              <li className="navbar-item">
                <span className="navbar-user">Welcome, {user?.username}</span>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="btn btn-primary navbar-button">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

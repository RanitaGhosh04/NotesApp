import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Notes App</h1>
        <p>A simple application to manage your notes efficiently.</p>
        
        {!isAuthenticated ? (
          <div className="home-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        ) : (
          <div className="home-buttons">
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
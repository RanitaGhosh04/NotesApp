import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        
        <div className="profile-info">
          <div className="profile-field">
            <label>Username</label>
            <p>{user?.username}</p>
          </div>
          
          <div className="profile-field">
            <label>Email</label>
            <p>{user?.email}</p>
          </div>
          
          <div className="profile-field">
            <label>Account Created</label>
            <p>Your account information is stored securely</p>
          </div>
        </div>
        
        <div className="profile-actions">
          <button 
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm('Are you sure you want to log out?')) {
                logout();
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
import React, { useState, useEffect } from 'react';
import './DashboardHome.css';
import axios from 'axios';
import { backendUrl } from '../../App';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    monthlyVisitors: 0,
    popularProduct: 'Loading...'
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch stats
        const statsResponse = await axios.get(`${backendUrl}/api/dashboard/stats`);
        setStats(statsResponse.data);
        
        // Fetch recent activity (you'll need to implement this endpoint)
        const activityResponse = await axios.get(`${backendUrl}/api/dashboard/activity`);
        setRecentActivity(activityResponse.data);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-home">
        <h2>Dashboard Overview</h2>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-home">
        <h2>Dashboard Overview</h2>
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <h3>Total Products</h3>
          <div className="stat-value">{stats.totalProducts}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <h3>Total Categories</h3>
          <div className="stat-value">{stats.totalCategories}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <h3>Monthly Visitors</h3>
          <div className="stat-value">{stats.monthlyVisitors}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <h3>Popular Product</h3>
          <div className="stat-value">{stats.popularProduct}</div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <li key={index}>
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-details">
                  <p>{activity.description}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </li>
            ))
          ) : (
            <li className="no-activity">
              <p>No recent activity</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
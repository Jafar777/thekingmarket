import React from 'react';
import './DashboardHome.css';

const DashboardHome = () => {
  // Sample data - in a real app, this would come from an API
  const stats = {
    totalProducts: 124,
    totalCategories: 8,
    monthlyVisitors: 4280,
    popularProduct: 'Fresh Beef Steak'
  };

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
          <li>
            <div className="activity-icon">📦</div>
            <div className="activity-details">
              <p>New product added: <strong>Organic Beef Steak</strong></p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </li>
          <li>
            <div className="activity-icon">👤</div>
            <div className="activity-details">
              <p>Admin <strong>KingAdmin</strong> logged in</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </li>
          <li>
            <div className="activity-icon">✏️</div>
            <div className="activity-details">
              <p>Product <strong>Fresh Apples</strong> was updated</p>
              <span className="activity-time">6 hours ago</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
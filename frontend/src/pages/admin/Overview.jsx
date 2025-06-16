import React from 'react';
import './Overview.css';

const Overview = () => {
  return (
    <div className="overview">
      <h2 className="section-title">Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <h3>24h Visitors</h3>
          <div className="stat-value">1,248</div>
          <div className="stat-change positive">+12%</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <h3>Orders Today</h3>
          <div className="stat-value">64</div>
          <div className="stat-change positive">+8%</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <h3>Revenue</h3>
          <div className="stat-value">$3,842</div>
          <div className="stat-change positive">+15%</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <h3>Products</h3>
          <div className="stat-value">248</div>
          <div className="stat-change positive">+5%</div>
        </div>
      </div>
      
      <div className="visitors-chart">
        <h3>Visitors Last 7 Days</h3>
        <div className="chart-placeholder">
          <div className="chart-bar" style={{ height: '80%' }}><span>Mon</span></div>
          <div className="chart-bar" style={{ height: '65%' }}><span>Tue</span></div>
          <div className="chart-bar" style={{ height: '90%' }}><span>Wed</span></div>
          <div className="chart-bar" style={{ height: '75%' }}><span>Thu</span></div>
          <div className="chart-bar" style={{ height: '85%' }}><span>Fri</span></div>
          <div className="chart-bar" style={{ height: '95%' }}><span>Sat</span></div>
          <div className="chart-bar" style={{ height: '70%' }}><span>Sun</span></div>
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
            <div className="activity-icon">💰</div>
            <div className="activity-details">
              <p>New order #ORD-4829 for <strong>$142.50</strong></p>
              <span className="activity-time">6 hours ago</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
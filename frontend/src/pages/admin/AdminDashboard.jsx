import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { logout } = useAdmin();
  
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>King Market Admin</h1>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
      
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <nav>
            <ul>
              <li>
                <Link to="/admin/dashboard">
                  <div className="nav-icon">🏠</div>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard/add-product">
                  <div className="nav-icon">➕</div>
                  <span>Add Product</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard/products">
                  <div className="nav-icon">📋</div>
                  <span>Product List</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
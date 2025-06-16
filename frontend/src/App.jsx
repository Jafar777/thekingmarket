import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from './context/AdminContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import DashboardHome from './pages/admin/DashboardHome';
import AddProduct from './pages/admin/AddProduct';
import ProductList from './pages/admin/ProductList';
import './App.css';
import './pages/Pages.css';
import ProductDetail from './pages/ProductDetail';
import ProductsPage from './pages/ProductsPage';

export const backendUrl = import.meta.env.VITE_API_BASE;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdmin();
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

const AdminLoginRoute = () => {
  const { isAuthenticated, loading } = useAdmin();
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  return isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />;
};

function App() {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} /> 
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin/*" element={<AdminLoginRoute />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            >
              <Route index element={<DashboardHome />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="products" element={<ProductList />} />
            </Route>
          </Routes>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
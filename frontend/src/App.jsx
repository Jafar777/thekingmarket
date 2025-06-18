import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// New component that uses location
const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/products" element={<PublicLayout><ProductsPage /></PublicLayout>} />
      <Route path="/product/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
      <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
      <Route path="/admin/*" element={<AdminLoginRoute />} />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        } 
      >
        <Route index element={<DashboardHome />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="products" element={<ProductList />} />
      </Route>
    </Routes>
  );
};

// Layout for public routes (with navbar/footer)
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <WhatsAppButton />
  </>
);

// Layout for admin routes (without navbar/footer)
const AdminLayout = ({ children }) => (
  <>{children}</>
);

function App() {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
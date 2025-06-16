import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import { backendUrl } from '../App';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backendUrl}/api/product/list`);
        
        if (!response.ok) {
          throw new Error(`Failed to load products: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">Our Products</h1>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
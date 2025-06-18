import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import { backendUrl } from '../App';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const productsResponse = await fetch(`${backendUrl}/api/product/list`);
        if (!productsResponse.ok) throw new Error(`Products failed: ${productsResponse.status}`);
        const productsData = await productsResponse.json();
        
        // Fetch categories
        const categoriesResponse = await fetch(`${backendUrl}/api/categories`);
        if (!categoriesResponse.ok) throw new Error(`Categories failed: ${categoriesResponse.status}`);
        const categoriesData = await categoriesResponse.json();
        
        // Add emojis to categories
        const emojiMap = {
          'meats': '🍖',
          'produce': '🥦',
          'Canned Goods': '🥫',
          'bakery': '🍞',
          'dairy': '🥛',
          'frozen': '❄️',
          'beverages': '🥤',
          'snacks': '🍿',
          'household': '🏠',
          'personal care': '🧴',
          'grain food':'🌾'
        };
        
        const categoriesWithEmojis = categoriesData.map(category => ({
          ...category,
          emoji: emojiMap[category.name.toLowerCase()] || '🛒'
        }));
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesWithEmojis);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      // Clicking the same category again clears the filter
      setSelectedCategory(null);
      setFilteredProducts(products);
    } else {
      // Filter products by category
      setSelectedCategory(categoryId);
      const filtered = products.filter(product => 
        product.category?._id === categoryId || 
        product.category === categoryId
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">Our Products</h1>
        
        {!loading && categories.length > 0 && (
          <div className="category-filter">
            <div className="category-list">
              {/* "All" category */}
              <div 
                className={`category-circle ${!selectedCategory ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(null)}
              >
                <span className="category-emoji">🛒</span>
                <span className="category-name">All</span>
              </div>
              
              {/* Other categories */}
              {categories.map(category => (
                <div 
                  key={category._id}
                  className={`category-circle ${selectedCategory === category._id ? 'selected' : ''}`}
                  onClick={() => handleCategoryClick(category._id)}
                >
                  <span className="category-emoji">{category.emoji}</span>
                  <span className="category-name">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
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
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found in this category</p>
            <button onClick={() => handleCategoryClick(null)}>
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
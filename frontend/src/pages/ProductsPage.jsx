import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import { backendUrl } from '../App';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
          'bread':'🥖'
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

  // Fetch subcategories when a category is selected
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategory) {
        setSubcategories([]);
        setSelectedSubcategory(null);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${backendUrl}/api/subcategories?category=${selectedCategory}`
        );
        
        if (!response.ok) {
          throw new Error(`Subcategories failed: ${response.status}`);
        }
        
        const data = await response.json();
        setSubcategories(data);
      } catch (err) {
        console.error('Error fetching subcategories:', err);
        setSubcategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  // Apply filters whenever selection or search changes
  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => 
        product.category?._id === selectedCategory || 
        product.category === selectedCategory
      );
    }
    
    // Apply subcategory filter - note the capital "C" in subCategory
    if (selectedSubcategory) {
      result = result.filter(product => {
        // Handle both populated and non-populated subcategory
        const subcategoryId = product.subCategory?._id || product.subCategory;
        return subcategoryId === selectedSubcategory;
      });
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.category?.name && product.category.name.toLowerCase().includes(query)) ||
        (product.subCategory?.name && product.subCategory.name.toLowerCase().includes(query))
      );
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, selectedSubcategory, searchQuery]);

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      // Clicking the same category again clears all filters
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(categoryId);
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryClick = (subcategoryId) => {
    if (selectedSubcategory === subcategoryId) {
      setSelectedSubcategory(null); // Deselect if same subcategory clicked
    } else {
      setSelectedSubcategory(subcategoryId);
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery('');
  };

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">Our Products</h1>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>
        
        {/* Clear Filters Button */}
        {(selectedCategory || selectedSubcategory || searchQuery) && (
          <div className="clear-filters">
            <button onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
        
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
        
        {/* Subcategories Section */}
        {selectedCategory && subcategories.length > 0 && (
          <div className="subcategory-filter">
            <h3 className="subcategory-title">Subcategories:</h3>
            <div className="subcategory-list">
              {subcategories.map(subcategory => (
                <div
                  key={subcategory._id}
                  className={`subcategory-item ${selectedSubcategory === subcategory._id ? 'selected' : ''}`}
                  onClick={() => handleSubcategoryClick(subcategory._id)}
                >
                  {subcategory.name}
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
            <p>No products found matching your criteria</p>
            <button onClick={clearFilters}>
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Product from './Product';
import './ProductsBar.css';
import { ShopContext } from '../context/ShopContext'
import { backendUrl } from '../App'
gsap.registerPlugin(ScrollTrigger);

const ProductsBar = () => {

  const sectionRef = useRef(null);
  const categoriesRef = useRef([]);
  const productsRef = useRef(null);


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories 
        const categoriesResponse = await fetch(`${backendUrl}/api/categories`);
        if (!categoriesResponse.ok) {
          const text = await categoriesResponse.text();
          throw new Error(`Categories error (${categoriesResponse.status}): ${text}`);
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch products
        const productsResponse = await fetch(`${backendUrl}/api/product/list`);
        if (!productsResponse.ok) {
          const text = await productsResponse.text();
          throw new Error(`Products error (${productsResponse.status}): ${text}`);
        }

        const responseData = await productsResponse.json();

        // FIX: Handle different response formats
        let productsData = [];

        if (Array.isArray(responseData)) {
          // If response is directly an array
          productsData = responseData;
        } else if (responseData.products && Array.isArray(responseData.products)) {
          // If response has products property
          productsData = responseData.products;
        } else if (responseData.data && Array.isArray(responseData.data)) {
          // If response has data property
          productsData = responseData.data;
        } else {
          throw new Error('Invalid products data format');
        }

        setAllProducts(productsData);
        setProducts(productsData);

      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load products. Please try again later.');
        setAllProducts([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup animation on unmount
    return () => {
      if (ScrollTrigger.getAll().length > 0) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  // Filter products by category
  useEffect(() => {
    // Ensure allProducts is an array before filtering
    if (!Array.isArray(allProducts)) {
      console.error('allProducts is not an array:', allProducts);
      setProducts([]);
      return;
    }

    if (selectedCategory) {
      const filtered = allProducts.filter(
        product => product.category && product.category._id === selectedCategory
      );
      setProducts(filtered);
    } else {
      setProducts(allProducts);
    }
  }, [selectedCategory, allProducts]);

  // Animation setup
  useEffect(() => {
    if (loading || !sectionRef.current) return;

    // Initialize GSAP animations
    if (categoriesRef.current.length > 0 && productsRef.current) {
      categoriesRef.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              toggleActions: "play none none none"
            }
          }
        );
      });

      gsap.fromTo(productsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [loading]);

  const toggleCategory = (categoryId) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
  };

  return (
    <section ref={sectionRef} className="products-section">
      <div className="container">
        <h2 className="section-title">Our Products</h2>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        <div className="products-container">
          <div className="categories-sidebar">
            {categories.map((category, index) => (
              <div
                key={category._id}
                ref={el => (categoriesRef.current[index] = el)}
                className={`category-circle ${selectedCategory === category._id ? 'active' : ''}`}
                onClick={() => toggleCategory(category._id)}
              >
                <div className="category-icon">
                  {category.name === 'meats' ? '🥩' :
                    category.name === 'produce' ? '🍏' :
                      category.name === 'Canned Food' ? '🥫' :
                        category.name === 'Fruits & Vegetables' ? '🥦' : '📦'}
                </div>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>

          <div ref={productsRef} className="products-grid">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : products.length > 0 ? (
              products.map(product => (
                product ? <Product key={product._id} product={product} /> : null
              ))
            ) : (
              <div className="no-products">
                <p>No products found</p>
                {allProducts.length > 0 && (
                  <button onClick={() => setSelectedCategory(null)}>
                    Show all products
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsBar;
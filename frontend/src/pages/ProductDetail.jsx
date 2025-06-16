import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail">
        
      <div className="product-gallery">
        <div className="main-image-container">
          {product.images.length > 1 && (
            <button className="nav-button prev" onClick={prevImage}>
              <FaChevronLeft />
            </button>
          )}
          
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name} 
            className="main-image"
          />
          
          {product.images.length > 1 && (
            <button className="nav-button next" onClick={nextImage}>
              <FaChevronRight />
            </button>
          )}
        </div>
        
        {product.images.length > 1 && (
          <div className="thumbnail-container">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => selectImage(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="thumbnail-image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        
        <div className="price-section">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.weight && <span className="weight">{product.weight}</span>}
        </div>
        
        <div className="category-section">
          <div className="category-info">
            <span className="category-label">Category:</span>
            <span className="category">{product.category?.name || 'Uncategorized'}</span>
          </div>
          
          {product.subcategory?.name && (
            <div className="subcategory-info">
              <span className="subcategory-label">Subcategory:</span>
              <span className="subcategory">{product.subcategory.name}</span>
            </div>
          )}
        </div>
        
        <div className="description-section">
          <h3 className="section-title">Description</h3>
          <p className="description">{product.description}</p>
        </div>
        
        <div className="action-buttons">
          <button className="add-to-cart">Add to Cart</button>
          <button className="back-button" onClick={() => navigate(-1)}>
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
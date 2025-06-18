import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const Product = ({ product }) => {
  const navigate = useNavigate();
  const mainImage = product.images?.[0];
  
  // Handle both category and subcategory data structures
  const categoryName = product.category?.name || 
                      (typeof product.category === 'string' ? product.category : '');
  
  // Handle subcategory (note the capital C in the property name)
  const subcategoryName = product.subCategory?.name || 
                         (typeof product.subCategory === 'string' ? product.subCategory : '');

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        {mainImage ? (
          <img 
            src={mainImage} 
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentNode.innerHTML = '<div class="product-image-placeholder">Image</div>';
            }}
          />
        ) : (
          <div className="product-image-placeholder">
            {product.name.split(' ').map(word => word.charAt(0)).join('')}
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        {/* Display subcategory if available */}
        {subcategoryName && (
          <div className="product-subcategory">
            {subcategoryName}
          </div>
        )}
        
        <div className="product-category">
          {categoryName}
        </div>
      </div>
    </div>
  );
};

export default Product;
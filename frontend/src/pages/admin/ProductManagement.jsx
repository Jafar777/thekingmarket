import React, { useState } from 'react';
import './ProductManagement.css';

const ProductManagement = () => {
  const [categories, setCategories] = useState([
    { id: 'meats', name: 'Meats', subcategories: ['Beef', 'Chicken', 'Lamb'] },
    { id: 'canned', name: 'Canned Food', subcategories: ['Vegetables', 'Fruits', 'Meats'] },
    { id: 'produce', name: 'Fruits & Vegetables', subcategories: ['Fruits', 'Vegetables', 'Organic'] },
    { id: 'other', name: 'Other Items', subcategories: ['Spices', 'Grains', 'Dairy'] },
  ]);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    description: '',
    weight: '',
    price: '',
    image: null,
    imagePreview: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddCategory = () => {
    const newCategory = prompt('Enter new category name:');
    if (newCategory) {
      setCategories(prev => [
        ...prev,
        { id: newCategory.toLowerCase().replace(/\s/g, '-'), name: newCategory, subcategories: [] }
      ]);
    }
  };
  
  const handleAddSubcategory = () => {
    if (!formData.category) {
      alert('Please select a category first');
      return;
    }
    
    const newSubcategory = prompt('Enter new subcategory name:');
    if (newSubcategory) {
      setCategories(prev => prev.map(cat => {
        if (cat.id === formData.category) {
          return {
            ...cat,
            subcategories: [...cat.subcategories, newSubcategory]
          };
        }
        return cat;
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Product added:', formData);
      setSuccess(true);
      setSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        subcategory: '',
        description: '',
        weight: '',
        price: '',
        image: null,
        imagePreview: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };
  
  const selectedCategory = categories.find(cat => cat.id === formData.category);
  
  return (
    <div className="product-management">
      <h2 className="section-title">Add New Product</h2>
      
      {success && (
        <div className="success-message">
          Product added successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-column">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <div className="select-container">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button 
                type="button" 
                onClick={handleAddCategory}
                className="add-btn"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Subcategory</label>
            <div className="select-container">
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                required
                disabled={!formData.category}
              >
                <option value="">Select a subcategory</option>
                {selectedCategory && selectedCategory.subcategories.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <button 
                type="button" 
                onClick={handleAddSubcategory}
                className="add-btn"
                disabled={!formData.category}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>
        </div>
        
        <div className="form-column">
          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter weight in kilograms"
              min="0.1"
              step="0.1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0.01"
              step="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Product Image</label>
            <div className="image-upload">
              {formData.imagePreview ? (
                <div className="image-preview">
                  <img src={formData.imagePreview} alt="Preview" />
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: '' }))}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  <div className="upload-text">
                    <div className="upload-icon">📁</div>
                    <p>Click to upload image</p>
                    <p className="small">(JPG, PNG, max 5MB)</p>
                  </div>
                </label>
              )}
            </div>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductManagement;
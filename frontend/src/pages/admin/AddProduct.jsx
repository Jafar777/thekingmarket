import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../../App'


const AddProduct = () => {
  // State initialization
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    summary: '',
    weight: '',
    price: '',
    images: [],
    imagePreviews: []
  });
  
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
useEffect(() => {
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      console.log('Fetching categories from:', `/api/categories`);
      
      const response = await fetch(`${backendUrl}/api/categories`);
      
      // Log response status and headers
      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]); // Reset to empty array on error
    } finally {
      setCategoriesLoading(false);
    }
  };
  
  fetchCategories();
}, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      const fetchSubcategories = async () => {
        try {
          setSubcategoriesLoading(true);
          const response = await fetch(`${backendUrl}/api/subcategories?category=${formData.category}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          setSubcategories(data || []);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        } finally {
          setSubcategoriesLoading(false);
        }
      };
      
      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newPreviews = [];
      const newImages = [];
      
      files.forEach(file => {
        newImages.push(file);
        const reader = new FileReader();
        
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          
          if (newPreviews.length === files.length) {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, ...newImages],
              imagePreviews: [...prev.imagePreviews, ...newPreviews]
            }));
          }
        };
        
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleRemoveImage = (index) => {
    const newPreviews = [...formData.imagePreviews];
    newPreviews.splice(index, 1);
    
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      images: newImages,
      imagePreviews: newPreviews
    }));
  };
  
  // Create a new category
  const createCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Please enter a category name');
      return;
    }
    
    try {
      const response = await fetch(`${backendUrl}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newCategoryName })
      });
      
      if (response.ok) {
        const data = await response.json();
        setCategories(prev => [...prev, data]);
        setFormData(prev => ({ ...prev, category: data._id }));
        setNewCategoryName('');
        setShowCategoryModal(false);
        alert('Category created successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to create category: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Network error. Please try again.');
    }
  };
  
  // Create a new subcategory
  const createSubcategory = async () => {
    if (!newSubcategoryName.trim()) {
      alert('Please enter a subcategory name');
      return;
    }
    
    if (!formData.category) {
      alert('Please select a category first');
      return;
    }
    
    try {
      const response = await fetch(`${backendUrl}/api/subcategories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: newSubcategoryName, 
          category: formData.category 
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubcategories(prev => [...prev, data]);
        setFormData(prev => ({ ...prev, subcategory: data._id }));
        setNewSubcategoryName('');
        setShowSubcategoryModal(false);
        alert('Subcategory created successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to create subcategory: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating subcategory:', error);
      alert('Network error. Please try again.');
    }
  };
  
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.summary);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('subcategory', formData.subcategory);
    formDataToSend.append('weight', formData.weight);
    
    // Append each image
    formData.images.forEach(image => {
      formDataToSend.append('images', image);
    });
    
    // FIX: Use axios correctly
    const response = await axios.post(
      `${backendUrl}/api/product/add`, 
      formDataToSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    // Axios responses are different from fetch
    if (response.status >= 200 && response.status < 300) {
      setSuccess(true);
      toast.success(response.data.message);
      setFormData({
        name: '',
        category: '',
        subcategory: '',
        summary: '',
        weight: '',
        price: '',
        images: [],
        imagePreviews: []
      });
      
      setTimeout(() => setSuccess(false), 3000);
    } else {
      toast.error(response.data.message || 'Failed to create product');
      console.error('API Error:', response.data);
    }
  } catch (error) {
    console.error('Network Error:', error);
    
    // Axios error handling
    if (error.response) {
      // Server responded with error status
      toast.error(error.response.data.message || 'Server error');
    } else {
      toast.error('Network error. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};
  
  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      
      {success && (
        <div className="success-message">
          Product added successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="product-form">
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
        
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <div className="select-container">
              {categoriesLoading ? (
                <p>Loading categories...</p>
              ) : (
                <>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    onClick={() => setShowCategoryModal(true)}
                    className="add-btn"
                  >
                    +
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label>Subcategory</label>
            <div className="select-container">
              {subcategoriesLoading ? (
                <p>Loading subcategories...</p>
              ) : (
                <>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    required
                    disabled={!formData.category || subcategories.length === 0}
                  >
                    <option value="">Select a subcategory</option>
                    {subcategories.map(sub => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    onClick={() => setShowSubcategoryModal(true)}
                    className="add-btn"
                    disabled={!formData.category}
                  >
                    +
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>Product Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Brief description of the product"
            rows="3"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Weight (optional)</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g., 1kg, 500g"
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
        </div>
        
        <div className="form-group">
          <label>Product Images</label>
          <div className="image-upload">
            {formData.imagePreviews.length > 0 ? (
              <div className="image-previews">
                {formData.imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index}`} />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveImage(index)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
            
            <label className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                required={formData.imagePreviews.length === 0}
              />
              <div className="upload-text">
                <div className="upload-icon">📁</div>
                <p>Click to upload images</p>
                <p className="small">(JPG, PNG, max 5MB each)</p>
              </div>
            </label>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>

      {/* Category Creation Modal */}
      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Category</h3>
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                autoFocus
              />
            </div>
            <div className="modal-buttons">
              <button 
                type="button" 
                onClick={createCategory}
                className="submit-btn"
              >
                Create
              </button>
              <button 
                type="button" 
                onClick={() => setShowCategoryModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subcategory Creation Modal */}
      {showSubcategoryModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Subcategory</h3>
            <div className="form-group">
              <label>Subcategory Name</label>
              <input
                type="text"
                value={newSubcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
                placeholder="Enter subcategory name"
                autoFocus
              />
            </div>
            <div className="modal-buttons">
              <button 
                type="button" 
                onClick={createSubcategory}
                className="submit-btn"
              >
                Create
              </button>
              <button 
                type="button" 
                onClick={() => setShowSubcategoryModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
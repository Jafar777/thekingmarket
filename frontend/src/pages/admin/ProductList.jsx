import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ProductList.css';
import { backendUrl } from '../../App';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/product/list`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories when category changes in edit form
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!editForm.category) {
        setSubcategories([]);
        return;
      }

      try {
        setSubcategoriesLoading(true);
        const response = await axios.get(
          `${backendUrl}/api/subcategories?category=${editForm.category}`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setSubcategoriesLoading(false);
      }
    };

    fetchSubcategories();
  }, [editForm.category]);

  // Initialize edit form
  useEffect(() => {
    if (editingId) {
      const product = products.find(p => p._id === editingId);
      if (product) {
        setEditForm({
          _id: product._id,
          name: product.name,
          description: product.description,
          category: product.category?._id || product.category,
          subCategory: product.subCategory?._id || product.subCategory,
          price: product.price,
          weight: product.weight || '',
          images: product.images
        });
      }
    }
  }, [editingId, products]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.post(`${backendUrl}/api/product/remove`, { id });
        setProducts(products.filter(p => p._id !== id));
        toast.success('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

    useEffect(() => {
    if (editingId) {
      const product = products.find(p => p._id === editingId);
      if (product) {
        setImagePreviews(product.images || []);
        setNewImages([]);
      }
    }
  }, [editingId, products]);

  

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
    // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

        const newPreviews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setImagePreviews(prev => [...prev, ...newPreviews]);
          setNewImages(prev => [...prev, ...files]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
   // Remove an image
 const handleRemoveImage = (index) => {
  setImagePreviews(prev => prev.filter((_, i) => i !== index));
  
  // If it's a new image, remove from newImages array
  if (index >= (imagePreviews.length - newImages.length)) {
    const newIndex = index - (imagePreviews.length - newImages.length);
    setNewImages(prev => prev.filter((_, i) => i !== newIndex));
  }
};

  // Open image modal
  const openImageModal = (productId) => {
    setCurrentProductId(productId);
    setShowImageModal(true);
    
    // Find the product
    const product = products.find(p => p._id === productId);
    if (product) {
      setImagePreviews(product.images || []);
      setNewImages([]);
    }
  };

    // Save images
  const saveImages = async () => {
  if (!currentProductId) return;
  
  try {
    const formData = new FormData();
    
    // Append new images
    newImages.forEach(image => {
      formData.append('images', image);
    });
    
    // Send kept images as JSON
    formData.append('keptImages', JSON.stringify(imagePreviews.filter(
      preview => preview.startsWith('http')
    )));
    
    // Send request to update images
    const response = await axios.put(
      `${backendUrl}/api/product/images/${currentProductId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    // Update the product in state
    setProducts(products.map(p => 
      p._id === currentProductId ? response.data.product : p
    ));
    
    toast.success('Images updated successfully');
    setShowImageModal(false);
  } catch (error) {
    console.error('Error updating images:', error);
    toast.error('Failed to update images');
  }
};


  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/product/${editForm._id}`,
        editForm
      );
      
      setProducts(products.map(p => 
        p._id === editForm._id ? response.data.product : p
      ));
      
      setEditingId(null);
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.subCategory?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

return (
    <div className="product-list">
      <h2>Manage Products</h2>
      
      <div className="list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>🔍</button>
        </div>
        <div className="product-count">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
      
      {/* Responsive table container */}
      <div className="table-responsive">
        <div className="products-table">
          <div className="table-header">
            <div className="header-cell">Product</div>
            <div className="header-cell">Category</div>
            <div className="header-cell">Description</div>
            <div className="header-cell">Price</div>
            <div className="header-cell actions">Actions</div>
          </div>
          
          <div className="table-body">
            {filteredProducts.map(product => (
              <div key={product._id} className="table-row">
                {editingId === product._id ? (
                  <>
                    <div className="table-cell">
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="edit-input"
                        required
                      />
                    </div>
                    <div className="table-cell">
                      <div className="edit-category">
                        <select
                          name="category"
                          value={editForm.category}
                          onChange={handleEditChange}
                          className="edit-input"
                          required
                        >
                          <option value="">Select category</option>
                          {categories.map(category => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        <select
                          name="subCategory"
                          value={editForm.subCategory}
                          onChange={handleEditChange}
                          className="edit-input"
                          required
                          disabled={subcategoriesLoading}
                        >
                          <option value="">Select subcategory</option>
                          {subcategories.map(sub => (
                            <option key={sub._id} value={sub._id}>
                              {sub.name}
                            </option>
                          ))}
                        </select>
                        {subcategoriesLoading && <span>Loading...</span>}
                      </div>
                    </div>
                    <div className="table-cell">
                      <input
                        type="text"
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        className="edit-input"
                        required
                      />
                    </div>
                    <div className="table-cell">
                      <div className="price-edit">
                        <input
                          type="number"
                          name="price"
                          value={editForm.price}
                          onChange={handleEditChange}
                          step="0.01"
                          min="0.01"
                          className="edit-input"
                          required
                        />
                        <input
                          type="text"
                          name="weight"
                          value={editForm.weight}
                          onChange={handleEditChange}
                          placeholder="Weight (optional)"
                          className="edit-input"
                        />
                      </div>
                    </div>
                    <div className="table-cell actions">
                      <button onClick={handleSaveEdit} className="save-btn">💾</button>
                      <button onClick={() => setEditingId(null)} className="cancel-btn">✕</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="table-cell">
                      <div className="product-info">
                        <div className="product-image">
                          {product.images && product.images.length > 0 ? (
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="product-img"
                            />
                          ) : (
                            <div className="no-image">📷</div>
                          )}
                        </div>
                        <div className="product-name">{product.name}</div>
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="category-info">
                        <span className="category">{product.category?.name || 'Uncategorized'}</span>
                        {product.subCategory?.name && (
                          <span className="subcategory"> / {product.subCategory.name}</span>
                        )}
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="product-description">{product.description}</div>
                    </div>
                    <div className="table-cell">
                      <div className="product-price">${(product.price || 0).toFixed(2)}</div>
                      {product.weight && <div className="product-weight">{product.weight}</div>}
                    </div>
                    <div className="table-cell actions">
                      <button onClick={() => setEditingId(product._id)} className="edit-btn">✏️</button>
                      <button 
                        onClick={() => openImageModal(product._id)} 
                        className="image-btn"
                        title="Edit images"
                      >
                        🖼️
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="delete-btn">🗑️</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

       {showImageModal && (
        <div className="modal-overlay">
          <div className="image-modal">
            <h3>Edit Product Images</h3>
            
            <div className="image-previews">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview-item">
                  <img 
                    src={preview} 
                    alt={`Preview ${index}`} 
                    className="preview-img"
                  />
                  <button 
                    onClick={() => handleRemoveImage(index)}
                    className="remove-img-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="image-upload-controls">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                multiple
                style={{ display: 'none' }}
              />
              <button 
                onClick={() => fileInputRef.current.click()}
                className="add-image-btn"
              >
                Add Images
              </button>
            </div>
            
            <div className="modal-buttons">
              <button 
                onClick={saveImages}
                className="save-btn"
              >
                Save Images
              </button>
              <button 
                onClick={() => setShowImageModal(false)}
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

export default ProductList;
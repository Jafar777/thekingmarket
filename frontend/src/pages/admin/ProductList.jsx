import React, { useState, useEffect } from 'react';
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
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
                      <button onClick={() => handleDelete(product._id)} className="delete-btn">🗑️</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
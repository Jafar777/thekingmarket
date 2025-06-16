import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
  // Sample products - in a real app, this would come from MongoDB
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Fresh Beef Steak',
      category: 'meats',
      subcategory: 'Beef',
      summary: 'Premium quality beef steak',
      weight: '1.5kg',
      price: 15.99,
      images: ['beef.jpg']
    },
    {
      id: 2,
      name: 'Organic Chicken Breast',
      category: 'meats',
      subcategory: 'Chicken',
      summary: 'Farm-raised organic chicken',
      weight: '1.2kg',
      price: 9.99,
      images: ['chicken.jpg']
    },
    {
      id: 3,
      name: 'Canned Corn',
      category: 'canned',
      subcategory: 'Vegetables',
      summary: 'Sweet corn in a can',
      weight: '400g',
      price: 2.49,
      images: ['corn.jpg']
    },
    {
      id: 4,
      name: 'Fresh Apples',
      category: 'produce',
      subcategory: 'Fruits',
      summary: 'Crisp and juicy apples',
      weight: '2kg',
      price: 4.99,
      images: ['apples.jpg']
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  useEffect(() => {
    if (editingId) {
      const product = products.find(p => p.id === editingId);
      if (product) {
        setEditForm({ ...product });
      }
    }
  }, [editingId, products]);
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveEdit = () => {
    setProducts(products.map(p => p.id === editingId ? editForm : p));
    setEditingId(null);
  };
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
      
      <div className="products-table">
        <div className="table-header">
          <div className="header-cell">Product</div>
          <div className="header-cell">Category</div>
          <div className="header-cell">Summary</div>
          <div className="header-cell">Price</div>
          <div className="header-cell actions">Actions</div>
        </div>
        
        <div className="table-body">
          {filteredProducts.map(product => (
            <div key={product.id} className="table-row">
              {editingId === product.id ? (
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
                      <input
                        type="text"
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        className="edit-input"
                        required
                      />
                      <span>/</span>
                      <input
                        type="text"
                        name="subcategory"
                        value={editForm.subcategory}
                        onChange={handleEditChange}
                        className="edit-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="table-cell">
                    <textarea
                      name="summary"
                      value={editForm.summary}
                      onChange={handleEditChange}
                      className="edit-input"
                      rows="2"
                      required
                    />
                  </div>
                  <div className="table-cell">
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
                          <div className="image-placeholder">{product.name.charAt(0)}</div>
                        ) : (
                          <div className="no-image">📷</div>
                        )}
                      </div>
                      <div className="product-name">{product.name}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="category-info">
                      <span className="category">{product.category}</span>
                      <span className="subcategory">{product.subcategory}</span>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="product-summary">{product.summary}</div>
                  </div>
                  <div className="table-cell">
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    {product.weight && <div className="product-weight">{product.weight}</div>}
                  </div>
                  <div className="table-cell actions">
                    <button onClick={() => setEditingId(product.id)} className="edit-btn">✏️</button>
                    <button onClick={() => handleDelete(product.id)} className="delete-btn">🗑️</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
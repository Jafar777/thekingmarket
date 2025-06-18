const Category = require('../models/categoryModel');
const upload = require('../middleware/upload'); // Add this import
// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log('Creating category:', name);
    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    
    // Check for existing category
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(409).json({ message: 'Category already exists' });
    }
    
    const category = new Category({ name: name.trim() });
    await category.save();
    
    console.log('Category created successfully:', category);
    res.status(201).json(category);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    console.log('Fetching all categories');
    const categories = await Category.find().sort({ createdAt: -1 });
    console.log(`Found ${categories.length} categories`);
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    
    // Optional: Remove this category from products
    await Product.updateMany(
      { category: id },
      { $unset: { category: 1 } }
    );
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
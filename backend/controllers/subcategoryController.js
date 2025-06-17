const Subcategory = require('../models/subCategoryModel');
const Category = require('../models/Category');

// Create new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    console.log(`Creating subcategory '${name}' for category ${category}`);
    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Subcategory name is required' });
    }
    
    if (!category) {
      return res.status(400).json({ message: 'Category ID is required' });
    }
    
    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Check for existing subcategory in same category
    const existingSubcategory = await Subcategory.findOne({ 
      name: name.trim(), 
      category 
    });
    
    if (existingSubcategory) {
      return res.status(409).json({ message: 'Subcategory already exists in this category' });
    }
    
    const subcategory = new Subcategory({ 
      name: name.trim(), 
      category 
    });
    
    await subcategory.save();
    
    console.log('Subcategory created successfully:', subcategory);
    res.status(201).json(subcategory);
  } catch (err) {
    console.error('Error creating subcategory:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

// Get subcategories by category
exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const categoryId = req.query.category;
    console.log(`Fetching subcategories for category ${categoryId}`);
    
    if (!categoryId) {
      return res.status(400).json({ message: 'Category parameter is required' });
    }
    
    const subcategories = await Subcategory.find({ category: categoryId }).sort({ createdAt: -1 });
    console.log(`Found ${subcategories.length} subcategories for category ${categoryId}`);
    res.json(subcategories);
  } catch (err) {
    console.error('Error fetching subcategories:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

// Update subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    console.log(`Updating subcategory ${id} with name: ${name}`);
    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Subcategory name is required' });
    }
    
    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );
    
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    
    console.log('Subcategory updated successfully:', subcategory);
    res.json(subcategory);
  } catch (err) {
    console.error('Error updating subcategory:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

// Delete subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting subcategory ${id}`);
    
    const subcategory = await Subcategory.findByIdAndDelete(id);
    
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    
    console.log('Subcategory deleted successfully:', subcategory);
    res.json({ 
      message: 'Subcategory deleted successfully',
      deletedSubcategory: subcategory
    });
  } catch (err) {
    console.error('Error deleting subcategory:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};
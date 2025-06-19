import express from 'express';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    
    // Get the latest product as "popular" (placeholder logic)
    const popularProduct = await Product.findOne().sort({ createdAt: -1 });
    
    res.json({
      totalProducts,
      totalCategories,
      monthlyVisitors: 4280, // You'll need analytics for this
      popularProduct: popularProduct?.name || 'No products'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
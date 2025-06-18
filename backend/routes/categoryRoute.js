import express from 'express';
import Category from '../models/categoryModel.js';
import {updateCategory , deleteCategory} from '../controllers/categoryController.js'
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
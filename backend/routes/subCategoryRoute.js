import express from 'express';
import SubCategory from '../models/subCategoryModel.js';
import {updateSubcategory ,deleteSubcategory} from '../controllers/subcategoryController.js'

const router = express.Router();

router.get('/', async (req, res) => {
  const { category } = req.query;
  try {
    const subcategories = await SubCategory.find({ category });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, category } = req.body;
  try {
    const newSubCategory = new SubCategory({ name, category });
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);

export default router;
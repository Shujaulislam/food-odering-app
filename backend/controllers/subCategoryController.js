// backend/controllers/subcategoryController.js

const Subcategory = require('../models/subCategory');
const Category = require('../models/Category');

const addSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subcategory = new Subcategory({ name, category: categoryId });
    await subcategory.save();

    res.status(201).json({ message: 'Subcategory added successfully', subcategory });
  } catch (error) {
    res.status(500).json({ message: 'Error adding subcategory', error });
  }
};

const removeSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Subcategory.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subcategory removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing subcategory', error });
  }
};

const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await Subcategory.find({ category: categoryId });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
};

module.exports = {
  addSubcategory,
  removeSubcategory,
  getSubcategoriesByCategory,
};

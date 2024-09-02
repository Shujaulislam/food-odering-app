// backend/controllers/subcategoryController.js

const Subcategory = require('../models/subCategory');
const Category = require('../models/Category');

const addSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check for existing subcategory with the same name
    const existingSubcategory = await Subcategory.findOne({ name });
    if (existingSubcategory) {
      return res.status(400).json({ message: `Subcategory with name "${name}" already exists.` });
    }

    const subcategory = new Subcategory({ name, category: categoryId });
    await subcategory.save();

    res.status(201).json({ message: 'Subcategory added successfully', subcategory });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return res.status(400).json({ message: 'Subcategory with this name already exists.', error });
    }
    res.status(500).json({ message: 'Error adding subcategory', error });
  }
};

const editSubcategory = async (req, res) => {
  try {
    const { id } = req.params; // Subcategory ID from URL parameters
    const { name, categoryId } = req.body; // Name and categoryId from request body

    // Validate if the new category exists
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    // Check for existing subcategory with the same name, excluding the current one
    const existingSubcategory = await Subcategory.findOne({ name, _id: { $ne: id } });
    if (existingSubcategory) {
      return res.status(400).json({ message: `Subcategory with name "${name}" already exists.` });
    }

    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      { name, category: categoryId },
      { new: true, runValidators: true }
    );

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory updated successfully', subcategory });
  } catch (error) {
    res.status(500).json({ message: 'Error editing subcategory', error });
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
  editSubcategory,
  getSubcategoriesByCategory,
};

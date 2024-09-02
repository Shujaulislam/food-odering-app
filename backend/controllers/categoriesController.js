// backend/controllers/categoryController.js

const Category = require('../models/Category');

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = new Category({
      name,
  
    });

    await category.save();
    res.status(201).json({ message: 'Category added successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error });
  }
};

const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing category', error });
  }
};

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};
const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find(); // Fetch all categories
      res.status(200).json(categories); // Send the categories as a JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories', error });
    }
  };
  
module.exports = {
  addCategory,
  removeCategory,
  editCategory,
  getAllCategories
};

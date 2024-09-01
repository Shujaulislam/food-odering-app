const Food = require('../models/Food');

const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFood = async (req, res) => {
  const { name, summary, description, price, imageUrl } = req.body;
  const food = new Food({ name, summary, description, price, imageUrl });
  
  try {
    const savedFood = await food.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, summary, price, imageUrl } = req.body;

  try {
    const updatedFood = await Food.findByIdAndUpdate(id, { name, summary, description, price, imageUrl }, { new: true });
    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getFoods, createFood, editFood, getFoodById };

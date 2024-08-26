const Cart = require('../models/Cart');
const Food = require('../models/Food');

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({});
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  const { foodId } = req.body;

  try {
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    let cart = await Cart.findOne({});
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    cart.items.push({
      foodId: food._id,
      name: food.name,
      description: food.description,
      price: food.price,
      imageUrl: food.imageUrl
    });

    await cart.save();
    res.status(201).json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    let cart = await Cart.findOne({});
    if (cart) {
      cart.items = cart.items.filter(item => item._id.toString() !== itemId);
      await cart.save();
    }
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, removeCartItem };

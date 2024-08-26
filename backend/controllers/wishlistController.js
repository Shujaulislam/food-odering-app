const Wishlist = require('../models/Wishlist');
const Food = require('../models/Food');

// Add a food item to the wishlist
// controllers/wishlistController.js



// Add a food item to the wishlist
const addToWishlist = async (req, res) => {
  const { foodId } = req.body; // Assuming foodId is passed in request body

  try {
    // Create or update wishlist for a user (userId assumed to be from authentication)
    const userId = req.user._id; // Example: assuming user is authenticated and userId is available

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, foods: [] });
    }

    if (!wishlist.foods.includes(foodId)) {
      wishlist.foods.push(foodId);
      await wishlist.save();
    }

    res.status(201).json(wishlist);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Failed to add to wishlist' });
  }
};




// Get list of favorite food items for a user
const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate('foods');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.json(wishlist.foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a food item from the wishlist
const removeFromWishlist = async (req, res) => {
  const { userId, foodId } = req.params;

  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { foods: foodId } },
      { new: true }
    ).populate('foods');

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.json(wishlist.foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist };

// routes/wishlistRoutes.js

const express = require('express');
const router = express.Router();
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');

// Add a food item to the wishlist
router.post('/addToWishlist', addToWishlist);

// Get list of favorite food items for a user
router.get('/wishlist/:userId', getWishlist);

// Remove a food item from the wishlist
router.delete('/wishlist/:userId/:foodId', removeFromWishlist);

module.exports = router;

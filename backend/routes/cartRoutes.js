const express = require('express');
const { getCart, addToCart, removeCartItem } = require('../controllers/cartController');

const router = express.Router();

router.get('/cart', getCart);
router.post('/addToCart', addToCart);
// router.put('/updateCart', updateCartItem); 
router.delete('/removeCart/:itemId', removeCartItem);

module.exports = router;

// const express = require('express');
// const { getCart, addToCart, removeCartItem } = require('../controllers/cartController');

// const router = express.Router();

// router.get('/cart', getCart);
// router.post('/cart', addToCart);
// router.delete('/cart/:itemId', removeCartItem);

// module.exports = router;

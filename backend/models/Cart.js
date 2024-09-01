const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [{
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    name: { type: String, required: true },
    summary: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }
  }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

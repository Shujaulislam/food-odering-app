const express = require('express');
const { getFoods, createFood, editFood, getFoodById } = require('../controllers/foodController');

const router = express.Router();

router.get('/getFoods', getFoods);
router.post('/postFood', createFood);
router.put('/editFood/:id', editFood);
router.get('/foods/:id', getFoodById);


module.exports = router;

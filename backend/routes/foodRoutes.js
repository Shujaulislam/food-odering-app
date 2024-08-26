const express = require('express');
const { getFoods, createFood, editFood } = require('../controllers/foodController');

const router = express.Router();

router.get('/getFoods', getFoods);
router.post('/postFood', createFood);
router.put('/editFood/:id', editFood);
module.exports = router;

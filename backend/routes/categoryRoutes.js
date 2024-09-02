// backend/routes/categoryRoute.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoriesController');

router.post('/addCategory', categoryController.addCategory);
router.post('/removeCategory/:id', categoryController.removeCategory);
router.post('/editCategory/:id', categoryController.editCategory);
router.get('/getAllcategories', categoryController.getAllCategories); 

module.exports = router;

// backend/routes/subcategoryRoutes.js

const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subCategoryController');

router.post('/addSubcategory', subcategoryController.addSubcategory);
router.post('/removeSubcategory/:id', subcategoryController.removeSubcategory);
router.get('/subcategories/:categoryId', subcategoryController.getSubcategoriesByCategory);

module.exports = router;

const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree
} = require('../controllers/categoryController');
const { validateCategory, validateObjectId } = require('../utils/validators');

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(validateCategory, createCategory);

router.route('/tree').get(getCategoryTree); //  Placed before `/:id`

router.route('/:id')
  .get(validateObjectId, getCategory) // Validate ID
  .put(validateObjectId, validateCategory, updateCategory) //  Validate ID & input
  .delete(validateObjectId, deleteCategory); //  Validate ID

module.exports = router;

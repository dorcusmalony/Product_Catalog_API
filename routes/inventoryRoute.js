const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByCategory
} = require('../controllers/productController');
const { validateProduct } = require('../utilsutils/validators');
const { validateObjectId } = require('../utilsutils/validateObjectId');

const router = express.Router();

// Place specific routes before dynamic ones to prevent conflicts
router.route('/featured').get(getFeaturedProducts);
router.route('/category/:categoryId').get(getProductsByCategory);

router.route('/')
  .get(getProducts)
  .post(validateProduct, createProduct);

router.route('/:id')
  .get(validateObjectId, getProduct)
  .put(validateObjectId, validateProduct, updateProduct)
  .delete(validateObjectId, deleteProduct);

module.exports = router;
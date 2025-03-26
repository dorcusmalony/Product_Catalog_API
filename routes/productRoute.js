const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByCategory
} = require('../controllers/productController.js');
const { validateProduct } = require('../utils/validators');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(validateProduct, createProduct);

router.route('/:id')
  .get(getProduct)
  .put(validateProduct, updateProduct)
  .delete(deleteProduct);

router.route('/featured').get(getFeaturedProducts);
router.route('/category/:categoryId').get(getProductsByCategory);

module.exports = router;
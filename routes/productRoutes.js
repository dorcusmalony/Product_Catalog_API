const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getLowStockItems } = require('../controllers/productController');
const { validateProduct } = require('../middlewares/validateProduct'); // validation middleware

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validateProduct, createProduct); //  validation middleware for POST requests
router.put('/:id', validateProduct, updateProduct); //  validation middleware for PUT requests
router.delete('/:id', deleteProduct);
router.get('/report/low-stock', getLowStockItems); // Low stock reporting endpoint

module.exports = router;
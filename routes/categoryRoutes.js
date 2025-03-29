const express = require('express');
const router = express.Router();
const { updateCategory } = require('../controllers/categoryController');

// Other routes...
router.put('/api/categories/:id', updateCategory);

module.exports = router;
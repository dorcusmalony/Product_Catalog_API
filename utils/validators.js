const { check, validationResult } = require('express-validator');

// Product validation rules
exports.validateProduct = [
  check('name', 'Name is required').not().isEmpty().trim(),
  check('description', 'Description is required').not().isEmpty(),
  check('price', 'Price must be a positive number').isFloat({ min: 0 }),
  check('discount', 'Discount must be between 0 and 100').optional().isInt({ min: 0, max: 100 }),
  check('category', 'Invalid category ID').isMongoId(),
  check('countInStock', 'Stock count must be a positive integer').isInt({ min: 0 }),
  validateRequest
];

// Category validation rules
exports.validateCategory = [
  check('name', 'Name is required').not().isEmpty().trim(),
  validateRequest
];

// Inventory validation rules
exports.validateInventory = [
  check('product', 'Invalid product ID').isMongoId(),
  check('quantity', 'Quantity must be a positive integer').isInt({ min: 0 }),
  validateRequest
];

// Unified error handling middleware
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

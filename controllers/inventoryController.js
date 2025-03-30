const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Get low stock items
// @route   GET /api/inventory/low-stock
// @access  Private/Admin
const getLowStockItems = asyncHandler(async (req, res) => {
  const lowStockItems = await Product.find({ 'variants.stock': { $lt: 10 } });
  res.json(lowStockItems);
});

// @desc    Update inventory quantity
// @route   PUT /api/inventory/:id
// @access  Private/Admin
const updateInventory = asyncHandler(async (req, res) => {
  const { variantId, quantity } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const variant = product.variants.id(variantId);
    if (variant) {
      variant.stock = quantity;
      await product.save();
      res.json({ message: 'Inventory updated' });
    } else {
      res.status(404);
      throw new Error('Variant not found');
    }
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getLowStockItems,
  updateInventory,
};
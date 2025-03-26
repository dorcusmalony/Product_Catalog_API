const inventory = require('../models/inventory');
const product = require('../models/product');
const errorResponse = require('../utils/errorResponse');

// @desc    Get all inventory items
// @route   GET /api/v1/inventory
// @access  Private
exports.getInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find().populate('product');

    res.status(200).json({
      success: true,
      count: inventory.length,
      data: inventory
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single inventory item
// @route   GET /api/v1/inventory/:id
// @access  Private
exports.getInventoryItem = async (req, res, next) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate('product');

    if (!inventory) {
      return next(
        new ErrorResponse(`Inventory item not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: inventory
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create inventory item
// @route   POST /api/v1/inventory
// @access  Private
exports.createInventoryItem = async (req, res, next) => {
  try {
    // Check if product exists
    const product = await Product.findById(req.body.product);
    if (!product) {
      return next(
        new ErrorResponse(`Product not found with id of ${req.body.product}`, 404)
      );
    }

    // Check if inventory item already exists for this product
    const existingInventory = await Inventory.findOne({ product: req.body.product });
    if (existingInventory) {
      return next(
        new ErrorResponse(`Inventory item already exists for product ${req.body.product}`, 400)
      );
    }

    const inventory = await Inventory.create(req.body);

    res.status(201).json({
      success: true,
      data: inventory
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update inventory item
// @route   PUT /api/v1/inventory/:id
// @access  Private
exports.updateInventoryItem = async (req, res, next) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('product');

    if (!inventory) {
      return next(
        new ErrorResponse(`Inventory item not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: inventory
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete inventory item
// @route   DELETE /api/v1/inventory/:id
// @access  Private
exports.deleteInventoryItem = async (req, res, next) => {
  try {
    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
      return next(
        new ErrorResponse(`Inventory item not found with id of ${req.params.id}`, 404)
      );
    }

    inventory.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get low stock items
// @route   GET /api/v1/inventory/low-stock
// @access  Private
exports.getLowStockItems = async (req, res, next) => {
  try {
    const lowStockItems = await Inventory.find({ 
      status: 'low-stock' 
    }).populate('product');

    res.status(200).json({
      success: true,
      count: lowStockItems.length,
      data: lowStockItems
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get out of stock items
// @route   GET /api/v1/inventory/out-of-stock
// @access  Private
exports.getOutOfStockItems = async (req, res, next) => {
  try {
    const outOfStockItems = await Inventory.find({ 
      status: 'out-of-stock' 
    }).populate('product');

    res.status(200).json({
      success: true,
      count: outOfStockItems.length,
      data: outOfStockItems
    });
  } catch (err) {
    next(err);
  }
};
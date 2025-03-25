const Product = require('.//models/Product');
const ErrorResponse = require('..//utils/errorResponse');
const APIFeatures = require('..//utils/apiFeatures');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      .sort()
      .paginate();

    const products = await features.query.populate('category').lean();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category').lean();

    if (!product) {
      return next(new ErrorResponse(`Product not found`, 404));
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = async (req, res, next) => {
  try {
    // Check if product with the same name exists
    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
      return next(new ErrorResponse('Product already exists', 400));
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('category');

    if (!product) {
      return next(new ErrorResponse(`Product not found`, 404));
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new ErrorResponse(`Product not found`, 404));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get featured products
// @route   GET /api/v1/products/featured
// @access  Public
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const products = await Product.find({ isFeatured: true }).limit(limit).lean();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get products by category
// @route   GET /api/v1/products/category/:categoryId
// @access  Public
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).lean();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

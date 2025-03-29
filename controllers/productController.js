const Product = require('../models/product');



// Get low stock items
const getLowStockItems = async (req, res) => {
  try {
    const lowStockThreshold = 5; // Define your low stock threshold
    const lowStockProducts = await Product.find({
      $or: [
        { inventory: { $lt: lowStockThreshold } },
        { 'variants.stock': { $lt: lowStockThreshold } },
      ],
    }).populate('category');
    res.status(200).json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all products or search for products
const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let products;
    if (search) {
      const regex = new RegExp(search, 'i'); // Case-insensitive search
      products = await Product.find({
        $or: [
          { name: regex },
          { description: regex },
        ],
      }).populate('category');
    } else {
      products = await Product.find().populate('category');
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getLowStockItems };
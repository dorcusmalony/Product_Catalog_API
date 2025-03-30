const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// Create a new product
router.post('/', asyncHandler(async (req, res) => {
  const { name, price, description, category } = req.body;

  const product = new Product({
    name,
    price,
    description,
    category,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
}));

// Get all products
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
}));

// Get a single product by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
}));

// Update a product
router.put('/:id', asyncHandler(async (req, res) => {
  const { name, price, description, category } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
}));

// Delete a product
router.delete('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
}));

module.exports = router;
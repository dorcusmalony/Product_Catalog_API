const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a variant name'],
    trim: true,
    maxlength: [50, 'Variant name cannot be more than 50 characters']
  },
  sku: {
    type: String,
    required: [true, 'Please add a SKU'],
    unique: true,
    trim: true,
    maxlength: [20, 'SKU cannot be more than 20 characters']
  },
  additionalCost: {
    type: Number,
    default: 0
  },
  stockCount: {
    type: Number,
    required: [true, 'Please add stock count'],
    min: [0, 'Stock count cannot be negative']
  }
});

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  richDescription: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: 'no-image.jpg'
  },
  images: [{
    type: String
  }],
  brand: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be at least 0']
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'category',
    required: true
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 10000
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  variants: [VariantSchema],
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate discounted price
ProductSchema.virtual('discountedPrice').get(function() {
  return this.price * (1 - (this.discount / 100));
});

// Reverse populate with virtuals
productSchema.virtual('inventory', {
  ref: 'inventory',
  localField: '_id',
  foreignField: 'product',
  justOne: true
});

module.exports = mongoose.model('Product', ProductSchema);
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  parentCategory: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals
CategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  justOne: false
});

// Cascade delete products when a category is deleted
CategorySchema.pre('remove', async function(next) {
  console.log(`Products being removed from category ${this._id}`);
  await this.model('Product').deleteMany({ category: this._id });
  next();
});

module.exports = mongoose.model('Category', CategorySchema);
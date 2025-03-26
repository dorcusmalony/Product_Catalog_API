const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'product',
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: [true, 'Please add quantity'],
    min: [0, 'Quantity cannot be negative']
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  lowStockThreshold: {
    type: Number,
    default: 10
  },
  status: {
    type: String,
    enum: ['in-stock', 'low-stock', 'out-of-stock'],
    default: 'in-stock'
  }
});

// Update status based on quantity
InventorySchema.pre('save', function(next) {
  if (this.quantity <= 0) {
    this.status = 'out-of-stock';
  } else if (this.quantity <= this.lowStockThreshold) {
    this.status = 'low-stock';
  } else {
    this.status = 'in-stock';
  }
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('inventory', inventorySchema);
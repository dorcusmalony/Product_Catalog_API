require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandlers');

// Route files
const products = require('./routes/productRoute');
const categories = require('./routes/categoryRoute');
const inventory = require('./routes/inventoryRoute');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routers
app.use('/api/v1/products', products);
app.use('/api/v1/categories', categories);
app.use('/api/v1/inventory', inventory);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
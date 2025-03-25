const ErrorResponse = require('../utils/errorResponse');
require('colors');

// Note the consistent naming - using plural "errorHandlers"
const errorHandlers = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err.stack.red || err.stack);

  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value || err.kind}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate value for field: ${field}`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message.join(', '), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: Array.isArray(error.message) ? error.message : [error.message] || ['Server Error']
  });
};

// Correct export - matches the variable name
module.exports = errorHandlers;
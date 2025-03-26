class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;  // ✅ Correct: Now it matches the class name

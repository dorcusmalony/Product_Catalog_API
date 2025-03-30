const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  authUser,
} = require('../controllers/userController');

router.route('/').get(getUsers).post(registerUser); // Update to use registerUser
router.route('/login').post(authUser); // Add route for user login
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
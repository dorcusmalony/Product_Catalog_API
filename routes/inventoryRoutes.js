const express = require('express');
const router = express.Router();
const {
  getLowStockItems,
  updateInventory,
} = require('../controllers/inventoryController');

router.route('/low-stock').get(getLowStockItems);
router.route('/:id').put(updateInventory);

module.exports = router;
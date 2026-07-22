const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createOrder)
  .get(protect, getMyOrders);

router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;

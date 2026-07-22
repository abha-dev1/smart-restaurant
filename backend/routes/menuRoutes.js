const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getMenuItems)
  .post(protect, adminOnly, createMenuItem);

router.route('/:id')
  .put(protect, adminOnly, updateMenuItem)
  .delete(protect, adminOnly, deleteMenuItem);

module.exports = router;

const express = require('express');
const router = express.Router();
const { bookTable, getReservations } = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, bookTable)
  .get(protect, getReservations);

module.exports = router;

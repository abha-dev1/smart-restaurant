const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback, deleteFeedback } = require('../controllers/feedbackController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, submitFeedback)
  .get(getAllFeedback);

router.delete('/:id', protect, adminOnly, deleteFeedback);

module.exports = router;

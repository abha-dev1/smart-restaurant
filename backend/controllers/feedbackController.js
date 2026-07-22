const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Feedback.create({ user: req.user._id, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({}).populate('user', 'name');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const review = await Feedback.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Feedback entry not discovered' });
    await review.deleteOne();
    res.json({ message: 'Feedback successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

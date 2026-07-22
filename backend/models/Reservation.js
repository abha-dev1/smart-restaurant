const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tableNumber: { type: Number, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  guests: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);

const Reservation = require('../models/Reservation');

exports.bookTable = async (req, res) => {
  try {
    const { tableNumber, date, timeSlot, guests } = req.body;
    const conflict = await Reservation.findOne({ tableNumber, date, timeSlot });
    if (conflict) return res.status(400).json({ message: 'This table has already been booked for this slot' });

    const reservation = await Reservation.create({ user: req.user._id, tableNumber, date, timeSlot, guests });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const filter = req.user.role === 'Admin' ? {} : { user: req.user._id };
    const bookings = await Reservation.find(filter).populate('user', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

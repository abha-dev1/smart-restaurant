const Order = require('../models/Order');
const Menu = require('../models/Menu');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: 'No items in order payload' });

    let total = 0;
    const itemsCalculated = [];

    for (const item of items) {
      const menuObj = await Menu.findById(item.menuItem);
      if (!menuObj) return res.status(404).json({ message: `Item validation exception: ${item.menuItem}` });
      total += menuObj.price * item.quantity;
      itemsCalculated.push({ menuItem: item.menuItem, quantity: item.quantity });
    }

    const order = await Order.create({ user: req.user._id, items: itemsCalculated, totalPrice: total });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const filter = req.user.role === 'Admin' ? {} : { user: req.user._id };
    const orders = await Order.find(filter).populate('user', 'name email').populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

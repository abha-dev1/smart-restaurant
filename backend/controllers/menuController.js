const Menu = require('../models/Menu');

exports.getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const item = await Menu.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    await item.deleteOne();
    res.json({ message: 'Menu item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

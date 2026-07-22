require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('./models/Menu');

const dummyMenu = [
  { name: "Classic Cheeseburger", description: "Grilled beef patty, cheddar, lettuce, special sauce", price: 12.99, category: "Mains" },
  { name: "Margherita Pizza", description: "Fresh mozzarella, tomato sauce, organic basil leaf", price: 14.50, category: "Mains" },
  { name: "Caesar Salad", description: "Crisp romaine, parmesan cheese, house crouton seasoning", price: 9.99, category: "Appetizers" },
  { name: "Chocolate Fudge Brownie", description: "Warm chocolate core topped with vanilla bean cream", price: 6.50, category: "Desserts" }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Menu.deleteMany();
    await Menu.insertMany(dummyMenu);
    console.log("Database successfully seeded with menu items.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding execution failure:", err);
    process.exit(1);
  }
};

seedDatabase();

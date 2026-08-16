// Run with: node seed.js (make sure .env is configured)
require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function seed() {
  await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_db');

  // remove old
  await Product.deleteMany({});
  await User.deleteMany({});

  const pw = await bcrypt.hash('admin123', 10);
  const admin = new User({ name: 'Admin', email: 'admin@example.com', password: pw, isAdmin: true });
  await admin.save();

  const products = [
    {
      name: 'Wireless Headphones',
      description: 'Comfortable wireless headphones with long battery life.',
      price: 99.99,
      countInStock: 15,
      image: 'https://via.placeholder.com/400?text=Wireless+Headphones',
      category: 'Electronics'
    },
    {
      name: 'Smart Watch',
      description: 'Stylish smart watch with fitness tracking.',
      price: 149.99,
      countInStock: 25,
      image: 'https://via.placeholder.com/400?text=Smart+Watch',
      category: 'Electronics'
    },
    {
      name: 'Running Shoes',
      description: 'Lightweight running shoes for everyday training.',
      price: 79.99,
      countInStock: 30,
      image: 'https://via.placeholder.com/400?text=Running+Shoes',
      category: 'Apparel'
    },
    {
      name: 'Coffee Maker',
      description: 'Brew the perfect cup every morning.',
      price: 59.99,
      countInStock: 10,
      image: 'https://via.placeholder.com/400?text=Coffee+Maker',
      category: 'Home'
    }
  ];

  await Product.insertMany(products);
  console.log('Seed data inserted. Admin: admin@example.com / admin123');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

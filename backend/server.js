require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_db';
connectDB(MONGO_URI);

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// basic root
app.get('/', (req, res) => {
  res.send('Ecommerce backend running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

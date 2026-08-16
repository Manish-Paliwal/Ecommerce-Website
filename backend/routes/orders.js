const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// create order
router.post('/', auth, async (req, res) => {
  try {
    const order = new Order({
      user: req.user._id,
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      totalPrice: req.body.totalPrice
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// get user's orders
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// get all orders (admin)
router.get('/', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Not authorized' });
  try {
    const orders = await Order.find().populate('user', 'name email').limit(500);
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

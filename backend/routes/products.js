const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// get all products (support ?search and ?category)
router.get('/', async (req, res) => {
  try {
    const q = {};
    if (req.query.search) q.name = { $regex: req.query.search, $options: 'i' };
    if (req.query.category) q.category = req.query.category;
    const products = await Product.find(q).limit(200);
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// get single product
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// admin create product
router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Not authorized' });
  try {
    const newP = new Product(req.body);
    await newP.save();
    res.status(201).json(newP);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// admin update
router.put('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Not authorized' });
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// admin delete
router.delete('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Not authorized' });
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

router.post('/scan', async (req, res) => {
  const { barcode } = req.body;
  const product = await Product.findOne({ where: { barcode } });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.post('/update', async (req, res) => {
  const { barcode, delta } = req.body;
  const product = await Product.findOne({ where: { barcode } });
  if (product) {
    product.stock += delta;
    await product.save();
    res.json({ newStock: product.stock });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;

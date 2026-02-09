const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      products: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching products',
      message: error.message
    });
  }
});

router.get('/search/:productId', async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }
    res.json({ 
      success: true, 
      product: product 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

router.post('/calculate', async (req, res) => {
  try {
    const { productId, name, brand, provider, price } = req.body;
    
    if (!productId || !name || !brand || !provider || price === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: productId, name, brand, provider, price'
      });
    }
    
    if (price <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Price must be greater than 0'
      });
    }
    
    const newProduct = new Product({
      productId: productId,
      name,
      brand,
      provider,
      price: parseFloat(price)
    });
    
    const savedProduct = await newProduct.save();
    
    res.status(201).json({
      success: true,
      product: savedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error creating product',
      message: error.message
    });
  }
});

module.exports = router;
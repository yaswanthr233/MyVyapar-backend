const {authenticateToken} = require('../middlewares/authenticateToken');
const { createProduct, getProducts} = require('../controllers/productController');

const express = require('express');
const router = express.Router();

router.post('/', authenticateToken, createProduct);
router.get('/', authenticateToken, getProducts);

module.exports = router;
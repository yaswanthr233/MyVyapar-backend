const {authenticateToken} = require('../middlewares/authenticateToken');
const { createProduct, getProducts, deleteProduct, updateProduct} = require('../controllers/productController');

const express = require('express');
const router = express.Router();

router.post('/', authenticateToken, createProduct);
router.get('/', authenticateToken, getProducts);
router.delete('/:id', authenticateToken, deleteProduct);
router.put('/:id', authenticateToken, updateProduct);

module.exports = router;
const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try{
        const { productName, productDescription, category, sku, purchasePrice, sellingPrice, quantity, unit, productImage, gstRate, taxInclusive } = req.body;
        const product = new Product({
            productName,
            productDescription,
            category,
            sku,
            purchasePrice,
            sellingPrice,
            quantity,
            unit,
            productImage,
            gstRate,
            taxInclusive,
            userId: req.user.id
        });
        const savedProduct = await product.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct});
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
}

const getProducts = async (req, res) => {
    try{
        const products = await Product.find({ userId: req.user.id });
        const lowStockProducts = products.filter(product => product.quantity <= product.lowStockAlert);
        const inStockProducts = products.filter(product => product.quantity > product.lowStockAlert);
        res.status(200).json({ message: 'Products fetched successfully', products, totalProducts: products.length, lowStockProducts: lowStockProducts.length, inStockProducts: inStockProducts.length });
    } catch(err){
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
}


module.exports = { createProduct, getProducts, createProduct };
const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try{
        const { productName, productDescription, category, sku, purchasePrice, sellingPrice, quantity, unit, productImage, gstRate, taxInclusive,hsnCode , actualPrice } = req.body;
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
            hsnCode,
            actualPrice,
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
        const lowStockProducts = products.filter(product => Number(product.quantity) <= 10);
        const inStockProducts = products.filter(product => Number(product.quantity) > 10);
        res.status(200).json({ message: 'Products fetched successfully', products, totalProducts: products.length, lowStockProducts: lowStockProducts.length, inStockProducts: inStockProducts.length });
    } catch(err){
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
}

const updateProduct = async (req, res) => {
    try{
        const userId = req.user.id;
        const productId = req.params.id;
        const {
            productName,
            productDescription,
            category,
            sku,
            hsnCode,
            purchasePrice,
            sellingPrice,
            quantity,
            unit,
            productImage,
            gstRate,
            taxInclusive
        } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId, userId },
            {
                $set: {
                    productName,
                    productDescription,
                    category,
                    sku,
                    hsnCode,
                    purchasePrice,
                    sellingPrice,
                    quantity,
                    unit,
                    productImage,
                    gstRate,
                    taxInclusive
                }
            },
            { returnDocument: 'after', runValidators: true }
        );
        if(!updatedProduct){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch(err){
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }  
}


const deleteProduct = async (req, res) => {
    try{
        const userId = req.user.id;
        const productId = req.params.id;
        const deletedProduct = await Product.findOneAndDelete({ _id: productId, userId });
        if(!deletedProduct){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch(err){
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
}

module.exports = { createProduct, getProducts ,deleteProduct, updateProduct };
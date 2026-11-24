const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        default:null
    },
    category: {
        type: String,
        required: true,
        default: ""  
    },
    hsnCode: {
        type: String,
        default: null
    },
    sku: {
        type: String,
        default: null
    },
    purchasePrice: {
        type: Number,
        required: true,
        default: 0
    },
    actualPrice:{
        type: Number,
        required: true,
        default: 0
    },
    sellingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String,
        required: true,
        default: ""
    },
    lowStockAlert: {
        type: Number,
        default: 10 
    },
    productImage: {
        type: String,
        default: null
    },
    gstRate: {
        type: Number,
        default: 0
    },
    taxInclusive: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }   

})

module.exports = mongoose.model('Product', productSchema);
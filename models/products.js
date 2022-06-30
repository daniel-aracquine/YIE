const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    //other data related to products
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
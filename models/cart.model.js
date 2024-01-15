const { required } = require('joi');
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },
        message: { type: String, default: '' },
        weight: { type: String, required: true },
        price: { type: Number, required: true },
        discountedPrice: { type: Number, required: true },
    }],
    totalAmount: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Cart', CartSchema)
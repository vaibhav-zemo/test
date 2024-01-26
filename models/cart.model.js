const mongoose = require('mongoose');
const {BIRTHDAY, ANNIVERSARY, OTHER} = require('../constants/occasionType')

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        message: { type: String, default: '' },
        weight: { type: String },
        price: { type: Number, required: true },
        discount: { type: Number },
        occasion: { type: String, enum: [BIRTHDAY, ANNIVERSARY, OTHER] },
        flavour: { type: String },
    }],
    totalAmount: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Cart', CartSchema)
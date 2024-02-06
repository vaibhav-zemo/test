const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    ratedProducts: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        rating: {type: Number}
    }],
}, { timestamps: true })

module.exports = mongoose.model('Customer', CustomerSchema)
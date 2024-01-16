const mongoose = require('mongoose');
const orderStatus = require('../constants/orderStatus')

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        message: { type: String, default: '' },
        weight: { type: String, required: true },
        price: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: [orderStatus.PENDING, orderStatus.ACCEPTED, orderStatus.CANCELLED, orderStatus.DELIVERED, orderStatus.DISPATCHED], default: orderStatus.PENDING },
    note: {type: String},
    couponCode: {type: String},
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)
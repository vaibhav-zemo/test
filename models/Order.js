const mongoose = require('mongoose');
const orderStatus = require('../constants/orderStatus')

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required },
    }],
    totalAmount: { type: Number, required },
    address: { type: String },
    status: { type: String, enum: [orderStatus.ORDERED , orderStatus.CANCELLED, orderStatus.DELIVERED, orderStatus.DISPATCHED], default: orderStatus.ORDERED },
    note: {type: String},
    time: {type: String},
    couponCode: {type: String},
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)
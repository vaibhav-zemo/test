const mongoose = require('mongoose');
const orderStatus = require('../constants/orderStatus')
const {BIRTHDAY, ANNIVERSARY, OTHER} = require('../constants/occasionType')

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        message: { type: String, default: '' },
        weight: { type: String },
        price: { type: Number, required: true },
        discount: { type: Number },
        occasion: { type: String, enum: [BIRTHDAY, ANNIVERSARY, OTHER] },
        flavour: { type: String },
        rating: { type: Number, default: 0 },
    }],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: [orderStatus.PENDING, orderStatus.ACCEPTED, orderStatus.CANCELLED, orderStatus.DELIVERED, orderStatus.DISPATCHED], default: orderStatus.PENDING },
    note: {type: String},
    couponCode: {type: String},
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    phoneNumber: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)
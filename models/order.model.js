const mongoose = require('mongoose');
const orderStatus = require('../constants/orderStatus')
const { BIRTHDAY, ANNIVERSARY, OTHER } = require('../constants/occasionType')

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        message: { type: String, default: '' },
        weight: { type: String },
        price: { type: Number, required: true },
        shopPrice: { type: Number },
        discount: { type: Number },
        occasion: { type: String, enum: [BIRTHDAY, ANNIVERSARY, OTHER] },
        flavour: { type: String },
        rating: { type: Number, default: 0 },
    }],
    totalAmount: { type: Number, required: true },
    totalShopAmount: { type: Number },
    address: { type: String, required: true },
    status: { type: String, enum: [orderStatus.ONGOING, orderStatus.ACCEPTED, orderStatus.CANCELLED, orderStatus.DELIVERED, orderStatus.DISPATCHED], default: orderStatus.ONGOING },
    note: { type: String },
    couponCode: { type: String },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    phoneNumber: { type: String, required: true },
    orderName: { type: String },
    city: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)
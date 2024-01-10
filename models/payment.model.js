const mongoose = require('mongoose');
const paymentMode = require('../constants/paymentMode')
const paymentStatus = require('../constants/paymentStatus')

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    transactionId: { type: String, required: true },
    paymentMode: { type: String, enum: [paymentMode.COD, paymentMode.UPI, paymentMode.CARD, paymentMode.NET_BANKING], default: paymentMode.COD, required },
    amount: { type: Number, required: true },
    status: { type: String, enum: [paymentStatus.SUCCESS, paymentStatus.FAILED, paymentStatus.PENDING], default: paymentStatus.PENDING, required },
}, { timestamps: true })

module.exports = mongoose.model('Payment', PaymentSchema)
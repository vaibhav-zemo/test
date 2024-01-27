const mongoose = require('mongoose')
const discountType = require('../constants/discountType')

const CouponSchema = new mongoose.Schema({
    discountType: {type: String, enum: [discountType.FLAT, discountType.PERCENTAGE], required: true},
    code: {type: String, required: true},
    flatDiscount: {type: Number},
    percentageDiscount: {type: Number},
    maxDiscount: {type: Number},
    expiryDate: {type: Date, required: true},
    isActive: {type: Boolean, default: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    description: {type: String, default: ''},
    city: {type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true}
}, {timestamps: true})

module.exports = mongoose.model('Coupon', CouponSchema)
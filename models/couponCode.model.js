const mongoose = require('mongoose')
const discountType = require('../constants/discountType')

const CouponCodeSchema = new mongoose.Schema({
    discountType: {type: String, enum: [discountType.FLAT, discountType.PERCENTAGE], required: true},
    code: {type: String, required: true, unique: true},
    flatDiscount: {type: Number},
    percentageDiscount: {type: Number},
    maxDiscount: {type: Number},
    expiryDate: {type: Date, required: true},
    isActive: {type: Boolean, default: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    description: {type: String, default: ''},
}, {timestamps: true})

module.exports = mongoose.model('CouponCode', CouponCodeSchema)
const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Merchant', MerchantSchema)
const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    shopName: { type: String, unique: true, required },
    isPartnered: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isAvailable: { type: Boolean },
}, { timestamps: true })

module.exports = mongoose.model('Merchant', MerchantSchema)
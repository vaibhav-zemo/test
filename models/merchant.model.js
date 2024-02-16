const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: false },
    orderAcceptedList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    city: { type: String, required: true },
    license: { type: String, required: true },
    bankDetails: {
        accountNumber: { type: String },
        ifsc: { type: String },
        branchName: { type: String },
        accountHolderName: { type: String },
    }
}, { timestamps: true })

module.exports = mongoose.model('Merchant', MerchantSchema)
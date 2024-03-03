const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: false },
    orderAcceptedList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    orderRejectedList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    weekEarnings: [
        {
            duration: { type: String },
            orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
        }
    ],
    monthEarnings: [
        {
            duration: { type: String },
            orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
        }
    ],
    city: { type: String, required: true },
    license: { type: String, required: true },
    upiId: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Merchant', MerchantSchema)
const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: false },
    orderAcceptedList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    orderRejectedList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    pastWeeksEarnings: [
        {
            duration: { type: String },
            orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
            createdAt: { type: Date, default: Date.now },
            totalEarning: { type: Number, default: 0 }
        }
    ],
    pastMonthsEarnings: [
        {
            duration: { type: String },
            orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
            createdAt: { type: Date, default: Date.now },
            totalEarning: { type: Number, default: 0 }
        }
    ],
    pastDaysEarnings: [
        {
            duration: { type: String },
            orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
            createdAt: { type: Date, default: Date.now },
            totalEarning: { type: Number, default: 0 }
        }
    ],
    pastYearsEarnings: [
        {
            duration: { type: String },
            orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
            createdAt: { type: Date, default: Date.now },
            totalEarning: { type: Number, default: 0 }
        }
    ],
    thisWeekOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    thisMonthOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    thisDayOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    thisYearOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    city: { type: String, required: true },
    license: { type: String, required: true },
    upiId: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Merchant', MerchantSchema)
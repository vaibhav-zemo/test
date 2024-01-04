const mongoose = require('mongoose');
const complaintStatus = require('../constants/complaintStatus')

const ComplaintSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    complaint: { type: String, required },
    description: { type: String },
    status: { type: String, enum: [complaintStatus.PENDING, complaintStatus.RESOLVED], default: complaintStatus.PENDING },
    time: {type: String},
}, { timestamps: true })

module.exports = mongoose.model('Complaint', ComplaintSchema)
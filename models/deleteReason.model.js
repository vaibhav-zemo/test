const mongoose = require('mongoose')

const deleteReasonSchema = new mongoose.Schema({
    reason: {type: String, required: true},
}, {timestamps: true})

module.exports = mongoose.model('DeleteReason', deleteReasonSchema)
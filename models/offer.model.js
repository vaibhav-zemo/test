const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
}, { timestamps: true })

module.exports = mongoose.model('Offer', offerSchema)
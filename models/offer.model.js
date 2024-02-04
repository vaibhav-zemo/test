const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: true })

module.exports = mongoose.model('Offer', offerSchema)
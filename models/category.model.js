const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String },
    price: { type: Number, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
}, { timestamps: true })

module.exports = mongoose.model('Category', CategorySchema)
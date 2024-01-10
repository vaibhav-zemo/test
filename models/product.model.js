const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    category: {type: String, required: true},
    price: {type: Number, required: true},
    discountedPrice: {type: Number, required: true}
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)
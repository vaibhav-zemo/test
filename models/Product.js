const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    inStock: { type: Boolean, default: true },
    imageUrl: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    category: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category', required}],
    merchantId: {type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required},
    price: {type: Number, required},
    discountedPrice: {type: Number, required}
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)
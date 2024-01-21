const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    ratedUsers: {type: Number, default: 0},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    prices: [
        {
            weight: { type: String },
            price: { type: Number, required: true },
        }
    ],
    flavours: [{ type: String }],
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    discount: { type: Number },
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)
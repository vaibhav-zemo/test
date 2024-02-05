const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    orders:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    ratedProducts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
}, {timestamps: true})

module.exports = mongoose.model('Customer', CustomerSchema)
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required, unique: true},
    orders:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
}, {timestamps: true})

module.exports = mongoose.model('Customer', CustomerSchema)
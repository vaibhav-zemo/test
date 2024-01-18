const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pinCode: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Address', AddressSchema)
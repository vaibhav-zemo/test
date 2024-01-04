const mongoose = require('mongoose')
const userRole = require('../constants/userRole')
const userGender = require('../constants/userGender')

const UserSchema = new mongoose.Schema({
    mobileNumber: {type: String, required, unique: true},
    username: { type: String, required: true },
    email: { type: String, unique: true },
    role: { type: String, enum: [userRole.ADMIN, userRole.MERCHANT, userRole.CUSTOMER, userRole.USER], default: userRole.USER },
    addresses: [{
        houseNumber: {type: String},
        area: {type: String},
        city: {type: String},
        state: {type: String},
        pinCode: {type: Number},
    }],
    gender: {type: String, enum: [userGender.MALE, userGender.FEMALE, userGender.OTHER]},
    cartId: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'},
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)
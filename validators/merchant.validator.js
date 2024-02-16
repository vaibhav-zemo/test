const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const { ACCEPTED, CANCELLED, DELIVERED, DISPATCHED } = require('../constants/orderStatus');

const bankDetails = Joi.object({
    accountNumber: Joi.string().required(),
    ifsc: Joi.string().required(),
    branchName: Joi.string().allow(''),
    accountHolderName: Joi.string().allow('')
})

const isValidForUpdate = Joi.object({
    userId: Joi.objectId().required(),
    isAvailable: Joi.boolean(),
    isVerified: Joi.boolean(),
    bankDetails: bankDetails,
}).or('isAvailable', 'isVerified', 'bankDetails').min(1);

const isValidOrderForUpdate = Joi.object({
    orderId: Joi.string().required(),
    status: Joi.string().valid(ACCEPTED, CANCELLED, DELIVERED, DISPATCHED).required()
})

module.exports = { isValidForUpdate, isValidOrderForUpdate }
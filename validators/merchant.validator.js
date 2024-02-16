const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const { ACCEPTED, CANCELLED, DELIVERED, DISPATCHED } = require('../constants/orderStatus');

const isValidForUpdate = Joi.object({
    userId: Joi.objectId().required(),
    isAvailable: Joi.boolean(),
    isVerified: Joi.boolean(),
}).xor('isAvailable', 'isVerified');

const isValidOrderForUpdate = Joi.object({
    orderId: Joi.string().required(),
    status: Joi.string().valid(ACCEPTED, CANCELLED, DELIVERED, DISPATCHED).required()
})

module.exports = { isValidForUpdate, isValidOrderForUpdate }
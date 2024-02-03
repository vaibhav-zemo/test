const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const { BIRTHDAY, ANNIVERSARY, OTHER } = require('../constants/occasionType')
const { PENDING, ACCEPTED, CANCELLED, DELIVERED, DISPATCHED } = require('../constants/orderStatus')

const isValidForCreate = Joi.object({
    userId: Joi.objectId().required(),
    items: Joi.array().items({
        productId: Joi.objectId().required(),
        message: Joi.string().allow(''),
        weight: Joi.string().allow(''),
        price: Joi.number().required(),
        discount: Joi.number(),
        occasion: Joi.string().valid(BIRTHDAY, ANNIVERSARY, OTHER).lowercase().allow(''),
        flavour: Joi.string().allow(''),
    }).required(),
    totalAmount: Joi.number().required(),
    couponCode: Joi.string(),
    address: Joi.string().required(),
    paymentId: Joi.objectId(),
    note: Joi.string().allow(''),
    phoneNumber: Joi.string().allow(''),
})

const isValidForUpdate = Joi.object({
    status: Joi.string().valid(PENDING, ACCEPTED, CANCELLED, DELIVERED, DISPATCHED),
    paymentId: Joi.objectId(),
}).min(1);

module.exports = { isValidForCreate, isValidForUpdate }

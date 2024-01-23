const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const { BIRTHDAY, ANNIVERSARY, OTHER } = require('../constants/occasionType')
const { PENDING, ACCEPTED, CANCELLED, DELIVERED, DISPATCHED } = require('../constants/orderStatus')

const isValidForCreate = Joi.object({
    userId: Joi.objectId().required(),
    items: Joi.array().items({
        productId: Joi.objectId().required(),
        quantity: Joi.number().required(),
        message: Joi.string().allow(''),
        weight: Joi.string(),
        price: Joi.number().required(),
        discount: Joi.number(),
        occasion: Joi.string().valid(BIRTHDAY, ANNIVERSARY, OTHER).lowercase(),
        flavour: Joi.string().allow(''),
    }).required(),
    totalAmount: Joi.number().required(),
    couponCode: Joi.string().required(),
    address: Joi.string().required(),
    paymentId: Joi.objectId().required(),
    note: Joi.string().allow(''),
    phoneNumber: Joi.string().required(),
})

const isValidForUpdate = Joi.object({
    status: Joi.string().valid(PENDING, ACCEPTED, CANCELLED, DELIVERED, DISPATCHED),
    items: Joi.array().items({
        rating: Joi.number().min(1).max(5),
    })
}).min(1);

module.exports = { isValidForCreate, isValidForUpdate }
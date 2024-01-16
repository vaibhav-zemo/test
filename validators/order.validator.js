const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const isValidForCreate = Joi.object({
    userId: Joi.objectId().required(),
    items: Joi.array().items({
        productId: Joi.objectId().required(),
        quantity: Joi.number().required(),
        message: Joi.string().allow(''),
        weight: Joi.string().required(),
        price: Joi.number().required(),
    }).required(),
    totalAmount: Joi.number().required(),
    couponCode: Joi.string().required(),
    address: Joi.string().required(),
    paymentId: Joi.objectId().required(),
    note: Joi.string().allow(''),
})

module.exports = { isValidForCreate }
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const isValidForCreate = Joi.object({
    orderId: Joi.objectId().required(),
    products: Joi.array().items(Joi.object({
        productId: Joi.objectId().required(),
        rating: Joi.number().min(1).max(5).required()
    })).required()
})

module.exports = { isValidForCreate }   
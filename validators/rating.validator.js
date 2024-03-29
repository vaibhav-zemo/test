const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const isValidForCreate = Joi.object({
    items: Joi.array().items(Joi.object({
        productId: Joi.objectId().required(),
        itemId: Joi.objectId().required(),
        rating: Joi.number().min(1).max(5).required()
    })).required()
})

module.exports = { isValidForCreate }   
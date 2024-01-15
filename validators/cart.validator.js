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
        discountedPrice: Joi.number().required(),
    }).required()
})

const itemSchema = Joi.object({
    productId: Joi.objectId().required(),
    quantity: Joi.number().required(),
    message: Joi.string().allow(''),
    weight: Joi.string().required(),
    price: Joi.number().required(),
    discountedPrice: Joi.number().required(),
})

const querySchema = Joi.object({
    quantity: Joi.number().required(),
    productId: Joi.objectId().required(),
})

const isValidForUpdate = Joi.object({
    item: itemSchema,
    query: querySchema,
}).or('item', 'query').min(1);

module.exports = { isValidForCreate, isValidForUpdate }
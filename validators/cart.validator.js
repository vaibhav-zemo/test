const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const { BIRTHDAY, ANNIVERSARY, OTHER } = require('../constants/occasionType.js')

const itemSchema = Joi.object({
    productId: Joi.objectId().required(),
    quantity: Joi.number().required(),
    message: Joi.string().allow(''),
    price: Joi.number().required(),
    weight: Joi.string(),
    discount: Joi.number(),
    flavour: Joi.string(),
    occasion: Joi.string().valid(BIRTHDAY, ANNIVERSARY, OTHER).lowercase(),
})  


const isValidForCreate = Joi.object({
    userId: Joi.objectId().required(),
    items: Joi.array().items(itemSchema).required(),
})

const querySchema = Joi.object({
    quantity: Joi.number().required(),
    itemId: Joi.objectId().required(),
})

const isValidForUpdate = Joi.object({
    item: itemSchema,
    query: querySchema,
}).or('item', 'query').min(1);

module.exports = { isValidForCreate, isValidForUpdate }
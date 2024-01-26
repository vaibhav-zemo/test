const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const { BIRTHDAY, ANNIVERSARY, OTHER } = require('../constants/occasionType.js')

const itemSchema = Joi.object({
    productId: Joi.objectId().required(),
    message: Joi.string().allow(''),
    price: Joi.number().required(),
    weight: Joi.string(),
    discount: Joi.number(),
    flavour: Joi.string(),
    occasion: Joi.string().valid(BIRTHDAY, ANNIVERSARY, OTHER).lowercase(),
})  

const isValidForCreate = Joi.object({
    userId: Joi.objectId().required(),
})

const isValidForUpdate = Joi.object({
    item: itemSchema,
    couponCode: Joi.string().allow(''),
}).min(1)

module.exports = { isValidForCreate, isValidForUpdate }
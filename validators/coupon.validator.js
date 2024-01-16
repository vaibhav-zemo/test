const Joi = require('joi');
const { PERCENTAGE, FLAT } = require('../constants/discountType')

const isValidForCreate =  Joi.object({
    discountType: Joi.string().valid(FLAT, PERCENTAGE).required(),
    code: Joi.string().max(10).required(),
    flatDiscount: Joi.number().when('discountType', {is: FLAT, then: Joi.required()}),
    percentageDiscount: Joi.number().when('discountType', {is: PERCENTAGE, then: Joi.required()}),
    maxDiscount: Joi.number().when('discountType', {is: PERCENTAGE, then: Joi.required()}),
    expiryDate: Joi.date().required(),
    description: Joi.string().required()
})

const isValidForUpdate = Joi.object({
    discountType: Joi.string().valid(FLAT, PERCENTAGE),
    code: Joi.string().max(10),
    flatDiscount: Joi.number().when('discountType', {is: FLAT, then: Joi.required()}),
    percentageDiscount: Joi.number().when('discountType', {is: PERCENTAGE, then: Joi.required()}),
    maxDiscount: Joi.number(),
    expiryDate: Joi.date(),
    description: Joi.string()
})

module.exports = { isValidForCreate, isValidForUpdate }
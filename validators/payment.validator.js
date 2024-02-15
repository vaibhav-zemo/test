const Joi = require('joi');

const isValidForVerify = Joi.object({
    orderId: Joi.string().required()
})

const isValidForCreate = Joi.object({
    userId: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    name: Joi.string().required(),
    amount: Joi.number().required(),
})

module.exports = { isValidForVerify, isValidForCreate }
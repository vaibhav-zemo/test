const Joi = require('joi');

const isValidForVerify = Joi.object({
    razorpay_order_id: Joi.string().required(),
    razorpay_payment_id: Joi.string().required(),
    razorpay_signature: Joi.string().required(),
})

const isValidForCreate = Joi.object({
    amount: Joi.number().required()
})

module.exports = { isValidForVerify, isValidForCreate }
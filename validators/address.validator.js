const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const isValidForCreate = Joi.object({
    userId: Joi.objectId().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pinCode: Joi.string().required(),
})

const isValidForUpdate = Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    pinCode: Joi.string(),
}).min(1)

module.exports = { isValidForCreate, isValidForUpdate }
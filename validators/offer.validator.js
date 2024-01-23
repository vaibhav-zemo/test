const Joi = require('joi');

const isValidForCreate = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    imageUrl: Joi.string(),
    city: Joi.string().required(),
})

module.exports = { isValidForCreate }
const Joi = require('joi');

const isValidForCreate = Joi.object({
    name: Joi.string().required(),
})

module.exports = { isValidForCreate }
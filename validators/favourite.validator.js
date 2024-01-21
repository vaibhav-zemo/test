const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const isValidForCreate = Joi.object({
    productId: Joi.objectId().required(),
})

module.exports = { isValidForCreate }
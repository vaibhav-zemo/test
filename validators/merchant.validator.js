const Joi = require('joi');

const isValidForUpdate = Joi.object({
    merchantId: Joi.string().required(),
    isAvailable: Joi.boolean(),
    isVerified: Joi.boolean(),
}).xor('isAvailable', 'isVerified');

module.exports = { isValidForUpdate }
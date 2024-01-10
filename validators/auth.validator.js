const Joi = require('joi');

const isValidPhoneNumber = Joi.object({
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required()
});

module.exports = {
    isValidPhoneNumber
}
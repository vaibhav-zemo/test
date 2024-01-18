const Joi = require('joi');

const isValidPhoneNumber = Joi.object({
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
    mail: Joi.string().email()
}).or('phoneNumber', 'mail').min(1);

module.exports = {
    isValidPhoneNumber
}
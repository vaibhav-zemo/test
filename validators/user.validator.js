const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const { FEMALE, MALE, OTHER } = require('../constants/userGender');
const { MERCHANT, CUSTOMER, ADMIN } = require('../constants/userRole');

const isValidForCreate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().allow(''),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    role: Joi.string().valid(MERCHANT, CUSTOMER, ADMIN).required(),
});

const isValidForUpdate = Joi.object({
    userName: Joi.string(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
    email: Joi.string().email(),
    gender: Joi.string().valid(FEMALE, MALE, OTHER),
    dob: Joi.string(),
}).or('userName', 'phoneNumber', 'email', 'gender', 'dob').min(1);

module.exports = {
    isValidForCreate,
    isValidForUpdate,
}
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const { FEMALE, MALE, OTHER } = require('../constants/userGender');
const { MERCHANT, CUSTOMER, ADMIN } = require('../constants/userRole');

const isValidForCreate = Joi.object({
    name: Joi.string().required(),
    gender: Joi.string().valid(FEMALE, MALE, OTHER).required(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    role: Joi.string().valid(MERCHANT, CUSTOMER, ADMIN).required(),
});

const addressSchema = Joi.object({
    houseNumber: Joi.string(),
    area: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    pinCode: Joi.string(), // Assuming pinCode can be a string
}).min(1);

const isValidForUpdate = Joi.object({
    userName: Joi.string(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
    email: Joi.string().email(),
    gender: Joi.string().valid(FEMALE, MALE, OTHER),
    address: addressSchema,
}).or('name', 'phoneNumber', 'email', 'gender').min(1);

module.exports = {
    isValidForCreate,
    isValidForUpdate
}
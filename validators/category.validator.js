const Joi = require('joi');

const isValidForCreate = Joi.object({
    name: Joi.string().required(),
    imageUrl: Joi.string(),
    price: Joi.number().required(),
    city: Joi.string().required(),
});

const isValidForUpdate = Joi.object({
    name: Joi.string(),
    imageUrl: Joi.string(),
    price: Joi.number(),
}).min(1);

module.exports = { isValidForCreate, isValidForUpdate }
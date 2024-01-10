const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    discountedPrice: Joi.number().required(),
})

const isValidForCreate = Joi.object({
    city: Joi.string().required(),
    product: productSchema.required()
});

module.exports = { isValidForCreate }
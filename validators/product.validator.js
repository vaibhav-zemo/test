const Joi = require('joi');

const priceSchema = Joi.object({
    weight: Joi.string().required(),
    price: Joi.number().required(),
    discountedPrice: Joi.number().required(),
})

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().required(),
    category: Joi.string().required(),
    prices: Joi.array().items(priceSchema).required(),
    flavour: Joi.string().required(),
})

const isValidForCreate = Joi.object({
    city: Joi.string().required(),
    product: productSchema.required()
});

module.exports = { isValidForCreate }
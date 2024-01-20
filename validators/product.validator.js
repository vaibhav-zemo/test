const Joi = require('joi');

const priceSchema = Joi.object({
    weight: Joi.string(),
    price: Joi.number().required(),
})

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    imageUrl: Joi.string().required(),
    category: Joi.string().required(),
    prices: Joi.array().items(priceSchema).required(),
    flavours: Joi.string(),
    discount: Joi.number(),
})

const isValidForCreate = Joi.object({
    city: Joi.string().required(),
    product: productSchema.required()
});

const isValidForUpdate = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    imageUrl: Joi.string(),
    category: Joi.string(),
    prices: Joi.array().items(priceSchema),
    flavours: Joi.string(),
    discount: Joi.number(),
}).min(1);

module.exports = { isValidForCreate, isValidForUpdate }
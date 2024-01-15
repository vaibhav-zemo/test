const { isValidForCreate } = require('../validators/product.validator.js')
const productService = require('../services/product.service.js')
const { productTransformer, productListTransformer, productDetailedTransformer } = require('../transformers/product.transformer.js')
const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        return res.status(200).json(productDetailedTransformer.transform(await productService.create({ data: value })));
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

const list = async (req, res) => {
    try {
        return res.status(200).json(productListTransformer.transform(await productService.list()));
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

const show = async (req, res) => {
    try {
        return res.status(200).json(productDetailedTransformer.transform(await productService.show({ id: req.params.id })));
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { create, list, show }
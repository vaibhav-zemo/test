const { isValidForCreate, isValidForUpdate } = require('../validators/product.validator.js')
const productService = require('../services/product.service.js')
const { productListTransformer, productTransformer } = require('../transformers/product.transformer.js')
const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        return res.status(200).json(productTransformer.transform(await productService.create({ data: value })));
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const list = async (req, res) => {
    try {
        return res.status(200).json(productListTransformer.transform(await productService.list({ city: req.query.city })));
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const show = async (req, res) => {
    try {
        return res.status(200).json(productTransformer.transform(await productService.show({ id: req.params.id })));
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const remove = async (req, res) => {
    try {
        return res.status(200).json(await productService.remove({ id: req.params.id }));
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const { error, value } = isValidForUpdate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        return res.status(200).json(productTransformer.transform(await productService.update({ id: req.params.id, data: value })));
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const bulkUpload = async (req, res) => {
    try {
        return res.status(200).json(await productService.bulkCreate({ data: req.body }));
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { create, list, show, remove, update, bulkUpload }
const { categoryListTransformer, categoryTransformer, categoryDetailedTransformer } = require('../transformers/category.transformer')
const categoryService = require('../services/category.service')
const { isValidForCreate, isValidForUpdate } = require('../validators/category.validator')

const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.message })
        }
        return res.status(201).json(categoryTransformer.transform(await categoryService.create({ ...value })))
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const remove = async (req, res) => {
    try {
        return res.status(200).json(await categoryService.remove({id: req.params.id}))
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const { error, value } = isValidForUpdate.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.message })
        }
        return res.status(201).json(categoryTransformer.transform(await categoryService.update({ id: req.params.id, data: value })))
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const list = async (req, res) => {
    try {
        return res.status(200).json(categoryListTransformer.transform(await categoryService.list({city: req.query.city})))
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const show = async (req, res) => {
    try {
        return res.status(200).json(categoryDetailedTransformer.transform(await categoryService.show({id: req.params.id})))
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const bulkUpload = async (req, res) => {
    try {
        return res.status(201).json(await categoryService.bulkUpload({ body: req.body }))
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { create, remove, update, list, show, bulkUpload }
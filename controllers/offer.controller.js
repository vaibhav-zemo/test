const { isValidForCreate } = require('../validators/offer.validator.js')
const { offerTransformer, offerListTransformer } = require('../transformers/offer.transformer.js')
const offerService = require('../services/offer.service.js')

const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.message })
        }
        return res.status(201).json(offerTransformer.transform(await offerService.create({ data: value })))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const list = async (req, res) => {
    try {
        return res.status(200).json(offerListTransformer.transform(await offerService.list({ city: req.query.city })))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const bulkUpload = async (req, res) => {
    try {
        return res.status(200).json(await offerService.bulkUpload({ file: req.file}))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        return res.status(200).json(await offerService.update({ id: req.params.id, data: req.body }))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    create,
    list,
    bulkUpload,
    update
}
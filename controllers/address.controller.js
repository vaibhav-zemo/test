const { isValidForCreate, isValidForUpdate } = require('../validators/address.validator')
const addressService = require('../services/address.service')
const { addressTransformer } = require('../transformers/address.transformer')

const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        return res.status(200).json(addressTransformer.transform(await addressService.create({ data: value })))
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const update = async (req, res) => {
    try {
        const { error, value } = isValidForUpdate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        return res.status(200).json(addressTransformer.transform(await addressService.update({ addressId: req.params.addressId, data: value })))
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const remove = async (req, res) => {
    try {
        return res.status(200).json(await addressService.remove({ addressId: req.params.addressId }));
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports = { create, update, remove }
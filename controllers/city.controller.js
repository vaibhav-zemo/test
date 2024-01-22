const cityService = require('../services/city.service')
const { cityListTransformer, cityTransformer } = require('../transformers/city.transformer.js')
const { isValidForCreate } = require('../validators/city.validator.js')

const list = async (req, res) => {
    try {
        return res.status(200).json(cityListTransformer.transform(await cityService.list()));
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        return res.status(200).json(cityTransformer.transform(await cityService.create({ ...value })));
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const remove = async (req, res) => {
    try {
        return res.status(200).json(await cityService.remove({ id: req.params.id }));
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {  list, create, remove }
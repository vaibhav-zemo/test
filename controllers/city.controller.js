const cityService = require('../services/city.service')
const { productListTransformer } = require('../transformers/product.transformer.js')
const { cityListTransformer } = require('../transformers/city.transformer.js')
const show = async (req, res) => {
    try {
        return res.status(200).json(productListTransformer.transform(await cityService.show({ city: req.params.city })));
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

const list = async (req, res) => {
    try {
        return res.status(200).json(cityListTransformer.transform(await cityService.list()));
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { show, list }
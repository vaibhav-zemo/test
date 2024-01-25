const addonService = require('../services/addon.service');
const { categoryDetailedTransformer } = require('../transformers/category.transformer');

const show = async (req, res) => {
    try {
        return res.status(200).json(categoryDetailedTransformer.transform(await addonService.show({ city: req.query.city, categoryName: req.query.name})))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { show }
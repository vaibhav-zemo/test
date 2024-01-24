const { isValidForCreate } = require('../validators/favourite.validator');
const favouriteService = require('../services/favourite.service');
const { favouriteListTransformer } = require('../transformers/favourite.transformer');
const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        return res.status(200).json(await favouriteService.create({ ...value, userId: req.query.userId }));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const list = async (req, res) => {
    try {
        return res.status(200).json(favouriteListTransformer.transform(await favouriteService.list({ userId: req.query.userId })));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const remove = async (req, res) => {
    try {
        return res.status(200).json(await favouriteService.remove({ userId: req.query.userId, productId: req.query.productId }));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { create, list, remove }
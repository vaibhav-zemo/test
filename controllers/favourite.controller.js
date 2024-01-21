const { isValidForCreate } = require('../validators/favourite.validator');
const favouriteService = require('../services/favourite.service');
const { favouriteListTransformer } = require('../transformers/favourite.transformer');
const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        return res.status(200).json(await favouriteService.create({ ...value, userId: res.locals.user._id }));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const list = async (req, res) => {
    try {
        return res.status(200).json(favouriteListTransformer.transform(await favouriteService.list({ userId: res.locals.user._id })));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const remove = async (req, res) => {
    try {
        return res.status(200).json(await favouriteService.remove({ userId: res.locals.user._id, productId: req.params.id }));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { create, list, remove }
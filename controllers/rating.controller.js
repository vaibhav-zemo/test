const { isValidForCreate } = require('../validators/rating.validator');
const ratingService = require('../services/rating.service');

const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(200).json(await ratingService.create({ ...value, userId: req.params.userId }));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const show = async (req, res) => {
    try {
        return res.status(200).json(await ratingService.show({userId: req.params.userId, productId: req.params.productId}))
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { create, show }
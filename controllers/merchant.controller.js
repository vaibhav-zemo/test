const merchantService = require('../services/merchant.service');
const { merchantListTransformer, merchantTransformer } = require('../transformers/merchant.transformer');
const { isValidForUpdate } = require('../validators/merchant.validator');
const show = async (req, res) => {
    try {
        return res.status(200).json(merchantTransformer.transform(await merchantService.show({ userId: req.params.userId })));
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const update = async (req, res) => {
    try {
        const { error, value } = isValidForUpdate.validate(req.body);
        if (error) throw new Error(error.message);

        return res.status(200).json(await merchantService.update({body: value}));
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const list = async (req, res) => {
    try {
        return res.status(200).json(merchantListTransformer.transform(await merchantService.list()));
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const isAvailable = async (req, res) => {
    try {
        return res.status(200).json(await merchantService.isAvailable());
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { show, update, list, isAvailable }
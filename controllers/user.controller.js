const { isValidForCreate, isValidForUpdate, isValidAddress } = require('../validators/user.validator');
const userService = require('../services/user.service');
const { userTransformer, getUserTransformer, userListTransformer, addressListTransformer } = require('../transformers/user.transformer');

const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        return res.status(200).json(userTransformer.transform(await userService.create({ ...value })));
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const update = async (req, res) => {
    try {
        const { error, value } = isValidForUpdate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        return res.status(200).json(getUserTransformer.transform(await userService.update({ data: value, userId: req.params.userId })));
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const remove = async (req, res) => {
    try {
        await userService.remove({ userId: req.params.userId });
        return res.status(200).json("User Deleted");
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const show = async (req, res) => {
    try {
        return res.status(200).json(getUserTransformer.transform(await userService.show({ userId: req.params.userId})));
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const list = async (req, res) => {
    try {
        return res.status(200).json(userListTransformer.transform(await userService.list()));
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = {list, show, update, create, remove}
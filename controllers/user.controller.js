const { isValidForCreate, isValidForUpdate } = require('../validators/user.validator');
const userService = require('../services/user.service');
const { userTransformer, getUserTransformer, userListTransformer } = require('../transformers/user.transformer');

module.exports.create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        return res.status(200).json(userTransformer.transform(await userService.create({ ...value })));
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.update = async (req, res) => {
    try {
        const { error, value } = isValidForUpdate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        return res.status(200).json(getUserTransformer.transform(await userService.update({ data: value, userId: req.params.userId })));
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.remove = async (req, res) => {
    try {
        return res.status(200).json("User Deleted");
    } catch (err) {
        console.log(err);
    }
}

module.exports.show = async (req, res) => {
    try {
        return res.status(200).json(getUserTransformer.transform(await userService.show({ userId: req.params.userId})));
    } catch (err) {
        console.log(err);
    }
}

module.exports.list = async (req, res) => {
    try {
        return res.status(200).json(userListTransformer.transform(await userService.list()));
    } catch (err) {
        console.log(err);
    }
}
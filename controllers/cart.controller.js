const { isValidForCreate, isValidForUpdate } = require('../validators/cart.validator')
const cartService = require('../services/cart.service')
const { cartTransformer } = require('../transformers/cart.transformer')
const show = async (req, res) => {
    try {
        return res.status(200).json(cartTransformer.transform(await cartService.show({ userId: req.params.userId })))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const create = async (req, res) => {
    try {
        const { error, value } = isValidForCreate.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.message })
        }

        return res.status(200).json(await cartService.create({ ...value }))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const { error, value } = isValidForUpdate.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.message })
        }

        return res.status(200).json(await cartService.update({ userId: req.params.userId, data: value }))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const remove = async (req, res) => {
    try {
        return res.status(200).json(await cartService.remove({ userId: req.query.userId, itemId: req.query.itemId }))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    show,
    create,
    update,
    remove,
}
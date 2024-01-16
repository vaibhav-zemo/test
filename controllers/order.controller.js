const {isValidForCreate} = require('../validators/order.validator');
const orderService = require('../services/order.service');
const {orderDetailedTransformer, orderListTransformer} = require('../transformers/order.transformer');

const create = async (req, res) => {
    try {
        const {error, value} = isValidForCreate.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.message});
        }
        
        return res.status(200).json(orderDetailedTransformer.transform(await orderService.create({data: value})));
    } catch (err) {
        return res.status(500).json({message: "Internal server error"});
    }
}

const show = async (req, res) => {
    try {
        return res.status(200).json(orderDetailedTransformer.transform(await orderService.show({id: req.params.id})));
    } catch (err) {
        return res.status(500).json({message: "Internal server error"});
    }
}

const list = async (req, res) => {
    try {
        return res.status(200).json(orderListTransformer.transform(await orderService.list()));
    } catch (err) {
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = { create, show, list }
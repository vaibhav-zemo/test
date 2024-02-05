const merchantService = require('../services/merchant.service');
const { merchantListTransformer, merchantTransformer, merchantOrderList } = require('../transformers/merchant.transformer');
const { isValidForUpdate } = require('../validators/merchant.validator');
const { orderListTransformer } = require('../transformers/order.transformer');

const show = async (req, res) => {
    try {
        return res.status(200).json(merchantTransformer.transform(await merchantService.show({ merchantId: req.params.merchantId })));
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const update = async (req, res) => {
    try {
        const { error, value } = isValidForUpdate.validate(req.body);
        if (error) throw new Error(error.message);

        return res.status(200).json(await merchantService.update({ body: value }));
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
        return res.status(200).json(await merchantService.isAvailable({city: req.params.city}));
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const create = async (req, res) => {
    try {
        return res.status(200).json(merchantTransformer.transform(await merchantService.create({ ...req.body, file: req.file })));
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getOrders = async (req, res) => {
    try {
        return res.status(200).json(merchantOrderList.transform(await merchantService.getOrders({ merchantId: req.params.merchantId, orderStatus: req.params.orderStatus })));
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        return res.status(200).json(await merchantService.updateOrderStatus({ merchantId: req.params.merchantId, data: req.body }));
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const myOrders = async (req, res) => {
    try {
        return res.status(200).json(orderListTransformer.transform(await merchantService.myOrders({ merchantId: req.params.merchantId })));
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const earning = async (req, res) => {
    try {
        return res.status(200).json(await merchantService.earning({ merchantId: req.params.merchantId }));
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { show, update, list, isAvailable, create, getOrders, updateOrderStatus, myOrders, earning }
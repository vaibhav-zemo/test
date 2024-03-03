const adminService = require('../services/admin.service');
const { orderListTransformer, userListTransformer } = require('../transformers/admin.transformer');

const currentOrders = async (req, res) => {
    try {
        return res.status(200).json(orderListTransformer.transform(await adminService.currentOrders()));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const listOrders = async (req, res) => {
    try {
        return res.status(200).json(orderListTransformer.transform(await adminService.listOrders()));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const listUsers = async (req, res) => {
    try {
        return res.status(200).json(userListTransformer.transform(await adminService.listUsers(req.query)));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { currentOrders, listOrders, listUsers }
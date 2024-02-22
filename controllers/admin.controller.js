const adminService = require('../services/admin.service');
const { orderListTransformer } = require('../transformers/admin.transformer');

const listOrders = async (req, res) => {
    try {
        return res.status(200).json(orderListTransformer.transform(await adminService.listOrders()));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { listOrders }
const { isValidForVerify, isValidForCreate } = require('../validators/payment.validator.js');
const paymentService = require('../services/payment.service.js');

const createOrder = async (req, res) => {
    try {
        const {error, value} = isValidForCreate.validate(req.body);
        if(error) return res.status(400).json({message: error.message});

        return res.status(200).json(await paymentService.createOrder({body: value}));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const verifyPayment = async (req, res) => {
    try {
        const {error, value} = isValidForVerify.validate(req.body);
        if(error) return res.status(400).json({message: error.message});

        return res.status(200).json(await paymentService.verifyPayment({body: value}));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createOrder,
    verifyPayment
}
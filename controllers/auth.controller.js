const { isValidPhoneNumber } = require('../validators/auth.validator')
const authService = require('../services/auth.service')
const { authTransformer } = require('../transformers/auth.transformer');

const create = async (req, res) => {
    try {
        const {error, value} = isValidPhoneNumber.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        
        return res.status(200).json(authTransformer.transform(await authService.create({ ...value })));
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    create
}
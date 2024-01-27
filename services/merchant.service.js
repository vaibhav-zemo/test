const User = require('../models/user.model');
const Merchant = require('../models/merchant.model');

const show = async ({ userId }) => {
    try {
        const merchant = await Merchant.findOne({ userId: userId });
        if (!merchant) throw new Error('Merchant not found');

        return merchant;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const update = async ({ body }) => {
    try {
        const merchant = await Merchant.findByIdAndUpdate({
            _id: body.merchantId
        },
            {
                $set: {
                    isAvailable: body.isAvailable,
                    isVerified: body.isVerified
                }
            },
            {
                new: true
            });
        if (!merchant) throw new Error('Merchant not found');

        return {message: 'Status updated successfully'};
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const list = async () => {
    try {
        const merchants = await Merchant.find();
        if (!merchants) throw new Error('No merchants found');
        return merchants;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const isAvailable = async () => {
    try {
        const merchants = await Merchant.find({ isAvailable: true });
        console.log(merchants)
        if (!merchants.length) throw new Error('No Merchants Available');
        return { message: 'Merchants Available' };
    }
    catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { show, update, list, isAvailable }
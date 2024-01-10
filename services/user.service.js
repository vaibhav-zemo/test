const User = require('../models/user.model');
const Customer = require('../models/customer.model');
const Merchant = require('../models/merchant.model');
const { MERCHANT, CUSTOMER } = require('../constants/userRole');
const jwt = require('jsonwebtoken');

const create = async ({ name, gender, phoneNumber, role, shopName }) => {
    try {
        let user = await User.findOne({ phoneNumber });

        if (!user) {
            const newUser = new User({
                userName: name,
                gender: gender,
                phoneNumber: phoneNumber,
                role: role,
            });

            user = await newUser.save();
        }

        const persona = await _createPersona({ role, userId: user._id, shopName });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return { persona, token };

    } catch (error) {
        throw new Error(error);
    }
}

const update = async ({ data, userId }) => {
    try {
        const userToUpdate = await User.findByIdAndUpdate(
            userId,
            { $set: data },
            { new: true }
        );
        if (!userToUpdate) throw new Error('User not found');

        return userToUpdate;
    }
    catch (error) {
        throw new Error(error);
    }
}

const remove = async ({ userId }) => {
    try {
        const userToRemove = await User.findByIdAndDelete(userId);
        if (!userToRemove) throw new Error('User not found');

        return userToRemove;
    }
    catch (error) {
        throw new Error(error);
    }
}

const _createPersona = async ({ role, userId, shopName }) => {
    try {
        if (role === CUSTOMER) {
            const newCustomer = new Customer({
                userId,
            });
            await newCustomer.save();
            return newCustomer;
        }
        else if (role === MERCHANT) {
            const newMerchant = new Merchant({
                userId,
                shopName,
            });
            await newMerchant.save();
            return newMerchant;
        }
    } catch (error) {
        throw new Error(error);
    }
}

const list = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error(error);
    }
}

const show = async ({ userId }) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        return user;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    create,
    update,
    remove,
    list,
    show,
}
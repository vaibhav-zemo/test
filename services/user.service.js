const User = require('../models/user.model');
const Customer = require('../models/customer.model');
const Merchant = require('../models/merchant.model');
const DeleteReason = require('../models/deleteReason.model');
const { MERCHANT, CUSTOMER } = require('../constants/userRole');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')

const create = async ({ name, email, phoneNumber, role }) => {
    try {
        let user = await User.findOne({ phoneNumber });

        if (!user) {
            if (email) {
                user = await User.findOne({ email });
                if (user) throw new Error('Email already exists');
            }

            const newUser = new User({
                userName: name,
                email: email,
                phoneNumber: phoneNumber,
                role: role,
            });

            user = await newUser.save();
        }

        const persona = await _createPersona({ role, userId: user._id });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return { persona, token };

    } catch (error) {
        throw new Error(error.message);
    }
}

const update = async ({ data, userId }) => {
    try {
        let { dob } = data;
        if (dob) {
            dob = dayjs(dob).toDate();
            data.dob = dob;
        }
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

const remove = async ({ userId, reason }) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        if (user.role === MERCHANT) {
            const merchant = await Merchant.findOne({ userId });
            await Merchant.findByIdAndDelete(merchant._id);
        }
        else if (user.role === CUSTOMER) {
            const customer = await Customer.findOne({ userId });
            await Customer.findByIdAndDelete(customer._id);
        }

        await User.findByIdAndDelete(userId);

        const deleteReason = new DeleteReason({reason});
        await deleteReason.save();
        return { message: 'User deleted successfully' };
    }
    catch (error) {
        throw new Error(error);
    }
}

const _createPersona = async ({ role, userId }) => {
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
        let user = await User.findById(userId).populate('address');
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
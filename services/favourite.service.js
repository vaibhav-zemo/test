const User = require('../models/user.model');
const Customer = require('../models/customer.model');

const create = async ({ productId, userId }) => {
    try {
        const customer = await Customer.findOne({ userId });
        if (!customer) {
            throw new Error("customer not found");
        }

        customer.favourites.push(productId);
        await customer.save();

        return { message: "Added to favourites" };
    } catch (error) {
        throw new Error(error.message);
    }
}

const list = async ({userId}) => {
    try {
        const customer = await Customer.findOne({ userId }).populate('favourites');
        if (!customer) {
            throw new Error("customer not found");
        }

        return customer.favourites;
    } catch (error) {
        throw new Error(error.message);
    }
}

const remove = async ({userId, productId}) => {
    try {
        const customer = await Customer.findOne({ userId });
        if (!customer) {
            throw new Error("customer not found");
        }

        customer.favourites.pull(productId);
        await customer.save();
        return { message: "Removed from favourites" };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { create, list, remove }  
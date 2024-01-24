const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Customer = require('../models/customer.model');

const create = async ({ data }) => {
    try {
        const user = await User.findById(data.userId);
        if (!user) {
            throw new Error('User not found');
        }

        const productIds = data.items.map(item => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });
        if (products.length !== productIds.length) {
            throw new Error('Product not found');
        }

        for (let item of data.items) {
            item.product = item.productId;
        }

        const order = new Order(data);
        (await order.save()).populate('items.product');

        const customer = await Customer.findOne({ userId: user._id });
        if (!customer) {
            throw new Error('Customer not found');
        }

        customer.orders.push(order);
        await customer.save();

        return order;
    } catch (error) {
        throw new Error(error.message)
    }
}

const show = async ({ id }) => {
    try {
        const order = await Order.findById(id).populate('items.product');
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    } catch (error) {
        throw new Error(error.message)
    }
}

const list = async ({ userId }) => {
    try {
        const customer = await Customer.findOne({ userId }).populate({
            path: 'orders',
            model: 'Order',
            populate: {
                path: 'items.product'
            }
        });
        if (!customer) {
            throw new Error('Customer not found');
        }

        return customer.orders;
    } catch (error) {
        throw new Error(error.message)
    }
}

const pendingList = async ({ orderStatus }) => {
    try {
        const orders = await Order.find({ orderStatus }).populate('items.product');
        return orders;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { create, list, show, pendingList }
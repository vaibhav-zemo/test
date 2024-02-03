const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Customer = require('../models/customer.model');
const orderStatus = require('../constants/orderStatus');
const Category = require('../models/category.model');

const create = async ({ data }) => {
    try {
        const user = await User.findById(data.userId);
        if (!user) {
            throw new Error('User not found');
        }

        for (let item of data.items) {
            item.product = item.productId;
        }

        const city = data.address.trim().split(' ').slice(-3, -2)[0];

        const order = new Order(data);
        if (!data.phoneNumber) order.phoneNumber = user.phoneNumber;
        order.city = city;

        await order.save();

        await order.populate({
            path: 'items.product',
            model: 'Product',
            populate: {
                path: 'category',
                model: 'Category'
            }
        })

        for (let item of order.items) {
            const category = item.product.category;
            if (category.name != 'Addon') {
                order.orderName = category.name;
                await order.save()
                break;
            }
        }

        await order.save()

        const customer = await Customer.findOne({ userId: user._id });
        if (!customer) {
            throw new Error('Customer not found');
        }

        customer.orders.push(order);
        await customer.save();

        return { id: order._id };
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

const list = async ({ userId, orderStatus }) => {
    try {
        if (orderStatus) {
            const orders = await Order.find({ status: orderStatus }).populate('items.product');

            return orders;
        }
        const customer = await Customer.findOne({ userId }).populate({
            path: 'orders',
            model: 'Order',
            populate: {
                path: 'items.product'
            }
        }).sort({ createdAt: -1 });

        if (!customer) {
            throw new Error('Customer not found');
        }

        return customer.orders;
    } catch (error) {
        throw new Error(error.message)
    }
}

const update = async ({ orderId, data }) => {
    try {
        const order = await Order.findByIdAndUpdate(orderId, data, { new: true }).populate('items.product');
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { create, list, show, update }

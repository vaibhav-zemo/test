const Order = require('../models/order.model');
const Customer = require('../models/customer.model');
const Merchant = require('../models/merchant.model');
const dayjs = require('dayjs');
const { DELIVERED, CANCELLED } = require('../constants/orderStatus');
const { MERCHANT } = require('../constants/userRole');
const currentOrders = async () => {
    try {
        const orders = await Order.find().populate('userId').sort({ createdAt: -1 });
        const customers = await Customer.find();
        let totalAmount = 0;
        let todayOrders = 0;

        const today = dayjs();
        const currentOrders = [];
        for (let order of orders) {
            totalAmount += order.totalAmount;
            if (dayjs(order.createdAt).isSame(today, 'day')) {
                todayOrders++;
            }

            if (!(order.status === DELIVERED || order.status === CANCELLED)) {
                currentOrders.push(order);
            }
        }

        return { orders: currentOrders, totalCustomers: customers.length, totalAmount, todayOrders, totalOrders: orders.length };
    } catch (error) {
        throw new Error(error.message);
    }
}

const listOrders = async () => {
    try {
        const orders = await Order.find().populate('userId').sort({ createdAt: -1 });
        return { orders };
    } catch (error) {
        throw new Error(error.message);
    }
}

const listUsers = async ({ approved, role }) => {
    try {
        let users;
        if (role === MERCHANT) {
            if (approved === undefined)
                users = await Merchant.find().populate('userId').sort({ createdAt: -1 });
            else
                users = await Merchant.find({ isVerified: approved }).populate('userId').sort({ createdAt: -1 });
        }
        else {
            users = await Customer.find().populate('userId').sort({ createdAt: -1 });
        }
        return { users, isMerchant: role === MERCHANT };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { currentOrders, listOrders, listUsers }
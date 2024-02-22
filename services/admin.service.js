const Order = require('../models/order.model');
const Customer = require('../models/customer.model');
const dayjs = require('dayjs');

const listOrders = async () => {
    try {
        const orders = await Order.find().populate('userId').sort({ createdAt: -1 });
        const customers = await Customer.find();
        let totalAmount = 0;
        let todayOrders = 0;

        const today = dayjs();
        for (let order of orders) {
            totalAmount += order.totalAmount;
            if(dayjs(order.createdAt).isSame(today, 'day')) {
                todayOrders++;
            }
        }

        return {orders, totalCustomers: customers.length, totalAmount, todayOrders};
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { listOrders }
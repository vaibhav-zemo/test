const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

// Extend Day.js with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const orderTransformer = {
    transform: (order) => {
        return {
            id: order?._id,
            createdAt: dayjs(order?.createdAt).tz('Asia/Kolkata').format('MMM D, YYYY'),
            customerName: order?.userId?.userName,
            address: order?.address,
            amount: order?.totalAmount,
            status: order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1),
        }
    }
}

const orderListTransformer = {
    transform: ({ orders: orderList, totalCustomers, todayOrders, totalAmount, totalOrders }) => {
        const response = {};
        response.list = orderList.map((order) => {
            return orderTransformer.transform(order);
        })
        response.totalCustomers = totalCustomers;
        response.todayOrders = todayOrders;
        response.totalAmount = totalAmount;
        response.totalOrders = totalOrders;
        return response;
    }
}

const userTransformer = {
    transform: (user, isMerchant) => {
        const transformedUser = {
            id: user?.userId?._id,
            createdAt: dayjs(user?.createdAt).tz('Asia/Kolkata').format('MMM D, YYYY'),
            name: user?.userId?.userName,
            email: user?.userId?.email,
        }

        if (isMerchant) {
            transformedUser.isVerified = user?.isVerified;
            transformedUser.license = user?.license;
            transformedUser.city = user?.city;
        }

        return transformedUser;
    }
}

const userListTransformer = {
    transform: ({users, isMerchant}) => {
        const response = {};
        response.list = users.map((user) => {
            return userTransformer.transform(user, isMerchant);
        })
        return response;
    }
}

module.exports = { orderListTransformer, userListTransformer }
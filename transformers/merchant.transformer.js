const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const { orderListTransformer } = require('./order.transformer');

// Extend Day.js with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const merchantTransformer = {
    transform: (merchant) => {
        return {
            userId: merchant?.userId._id,
            name: merchant?.userId?.userName,
            email: merchant?.userId?.email,
            phoneNumber: merchant?.userId?.phoneNumber,
            merchantId: merchant?._id,
            isVerified: merchant?.isVerified,
            isAvailable: merchant?.isAvailable,
            city: merchant?.city,
            license: merchant?.license,
            upiId: merchant?.upiId
        }
    }
}

const merchantListTransformer = {
    transform: (merchants) => {
        const response = {};
        response.list = merchants.map(merchant => {
            return merchantTransformer.transform(merchant);
        })
        return response;
    }
}

const merchantOrder = {
    transform: (order) => {
        return {
            orderId: order?._id,
            address: order?.address,
            odt: dayjs(order?.createdAt).tz('Asia/Kolkata').add(90, 'm').format('hh:mm A'),
        }
    }
}

const merchantOrderList = {
    transform: (orders) => {
        const response = {};
        response.list = orders.map(order => {
            return merchantOrder.transform(order);
        })
        return response;
    }
}

const merchantEarning = {
    transform: (earning) => {
        return {
            duration: earning?.duration,
            orders: orderListTransformer.transform({ order: earning?.orders, isMerchant: true }),
            totalEarning: earning?.totalEarning
        }
    }
}

const merchantEarningList = {
    transform: ({ earnings }) => {
        const response = {};
        response.list = earnings?.map(earning => {
            return merchantEarning.transform(earning);
        })
        return response;
    }
}

module.exports = { merchantTransformer, merchantListTransformer, merchantOrderList, merchantEarningList };
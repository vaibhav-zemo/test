const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

// Extend Day.js with plugins
const User = require('../models/user.model');
const Merchant = require('../models/merchant.model');
const { MERCHANT } = require('../constants/userRole');
const Order = require('../models/order.model');
const { DELIVERED, ONGOING } = require('../constants/orderStatus');
const { DELIVERY_FEE } = require('../constants/deliveryFee.js');
const { WEEK, MONTH, DAY, YEAR } = require('../constants/duration.js');
const cron = require('node-cron');
const { initializeApp } = require('firebase/app')
const config = require('../config/firebase.config.js');
initializeApp(config.firebaseConfig)

const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')
const storage = getStorage();

dayjs.extend(utc);
dayjs.extend(timezone);

const show = async ({ userId }) => {
    try {
        const merchant = await Merchant.findOne({ userId }).populate('userId');
        if (!merchant) throw new Error('Merchant not found');

        return merchant;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const update = async ({ body }) => {
    try {
        const merchant = await Merchant.findOneAndUpdate({
            userId: body.userId
        },
            {
                $set: {
                    isAvailable: body.isAvailable,
                    isVerified: body.isVerified,
                    upiId: body.upiId,
                }
            },
            {
                new: true
            });
        if (!merchant) throw new Error('Merchant not found');

        return { message: 'Merchant updated' };
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

const isAvailable = async ({ city }) => {
    try {
        const merchants = await Merchant.find({ isAvailable: true, city: city });
        if (!merchants.length) throw new Error('No Merchants Available');
        return { message: 'Merchants Available' };
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const create = async ({ userName, email, city, phoneNumber, file }) => {
    try {

        let user = await User.findOne({ phoneNumber });
        if (user) throw new Error('Phone already used');

        if (email) {
            user = await User.findOne({ email });
            if (user) throw new Error('Email already used');
        }

        const dateTime = _giveCurrentDateTime();

        const storageRef = ref(storage, `License/${file.originalname + "" + dateTime}`);
        const metadata = {
            contentType: file.mimetype
        };

        const snapShot = await uploadBytesResumable(storageRef, file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapShot.ref);

        user = new User({ userName, email, role: MERCHANT, phoneNumber });
        user = await user.save();

        const merchant = new Merchant({ userId: user._id, city, license: downloadURL });
        await merchant.save();

        return merchant;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const _giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

const getOrders = async ({ userId, orderStatus }) => {
    try {
        const merchant = await Merchant.findOne({ userId: userId });
        if (!merchant) throw new Error('Merchant not found');
        if (!merchant.isAvailable) throw new Error('Merchant not available');

        const orders = await Order.find({ city: merchant.city, status: orderStatus }).populate('items.product');
        if (!orders) throw new Error('No orders found');

        return orders.filter(order => !(merchant.orderRejectedList.includes(order._id)));
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const updateOrderStatus = async ({ userId, data }) => {
    try {
        const order = await Order.findById(data.orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        if (order.status !== ONGOING) {
            throw new Error('Order already accepted or delivered by another merchant');
        }

        const merchant = await Merchant.findOne({ userId: userId });
        if (!merchant) throw new Error('Merchant not found');

        order.status = data.status;
        await order.save();

        merchant.orderAcceptedList.push(order);
        merchant.thisWeekOrders.push(order._id);
        merchant.thisMonthOrders.push(order._id);
        merchant.thisDayOrders.push(order._id);
        merchant.thisYearOrders.push(order._id);
        await merchant.save();

        return { message: 'Order status updated' };
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const myOrders = async ({ userId }) => {
    try {
        const merchant = await Merchant.findOne({ userId: userId }).populate('orderAcceptedList');
        if (!merchant) throw new Error('Merchant not found');

        return { order: merchant.orderAcceptedList, isMerchant: true };
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const earning = async ({ userId }) => {
    try {
        const merchant = await Merchant.findOne({ userId: userId }).populate({
            path: 'thisWeekOrders thisMonthOrders thisDayOrders thisYearOrders',
        });
        if (!merchant) throw new Error('Merchant not found');

        const weekEarning = _calculateEarning(merchant.thisWeekOrders);
        const monthEarning = _calculateEarning(merchant.thisMonthOrders);
        const dayEarning = _calculateEarning(merchant.thisDayOrders);
        const yearEarning = _calculateEarning(merchant.thisYearOrders);

        return { monthEarning, weekEarning, dayEarning, yearEarning };
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const pastEarnings = async ({ userId, duration }) => {
    try {
        const merchant = await Merchant.findOne({ userId: userId }).populate({
            path: 'pastWeeksEarnings pastMonthsEarnings pastDaysEarnings pastYearsEarnings',
            populate: {
                path: 'orders'
            }
        }).populate({
            path: 'thisWeekOrders thisMonthOrders thisDayOrders thisYearOrders'
        });
        if (!merchant) throw new Error('Merchant not found');

        let totalEarning = 0;
        let pastEarnings = [];
        if (duration === WEEK) {
            for (let order of merchant.thisWeekOrders) {
                totalEarning += order.totalShopAmount;
            }
            pastEarnings.push({ orders: merchant.thisWeekOrders, duration: dayjs().startOf('week').format('DD/MM/YYYY') + ' - ' + dayjs().format('DD/MM/YYYY'), totalEarning });
            let pastWeeksEarnings = merchant.pastWeeksEarnings.sort((a, b) => dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1);
            pastEarnings.push(...pastWeeksEarnings);
        }
        else if (duration === MONTH) {
            for (let order of merchant.thisMonthOrders) {
                totalEarning += order.totalShopAmount;
            }
            pastEarnings.push({ orders: merchant.thisMonthOrders, duration: dayjs().startOf('month').format('DD/MM/YYYY') + ' - ' + dayjs().format('DD/MM/YYYY'), totalEarning });
            let pastMonthsEarnings = merchant.pastMonthsEarnings.sort((a, b) => dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1);
            pastEarnings.push(...pastMonthsEarnings);
        }
        else if (duration === DAY) {
            for (let order of merchant.thisDayOrders) {
                totalEarning += order.totalShopAmount;
            }
            pastEarnings.push({ orders: merchant.thisDayOrders, duration: dayjs().format('DD/MM/YYYY') + ' - ' + dayjs().format('DD/MM/YYYY'), totalEarning });
            let pastDaysEarnings = merchant.pastDaysEarnings.sort((a, b) => dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1);
            pastEarnings.push(...pastDaysEarnings);
        }
        else if (duration === YEAR) {
            for (let order of merchant.thisYearOrders) {
                totalEarning += order.totalShopAmount;
            }
            pastEarnings.push({ orders: merchant.thisYearOrders, duration: dayjs().startOf('year').format('DD/MM/YYYY') + ' - ' + dayjs().format('DD/MM/YYYY'), totalEarning });
            let pastYearsEarnings = merchant.pastYearsEarnings.sort((a, b) => dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1);
            pastEarnings.push(...pastYearsEarnings);
        }
        else return { message: 'Invalid duration' };

        return { earnings: pastEarnings }
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const _calculateEarning = (orders) => {
    let totalEarning = 0;
    for (let order of orders) {
        totalEarning += order.totalShopAmount;
    }
    return totalEarning;
}

const declineOrder = async ({ userId, orderId }) => {
    try {

        const merchant = await Merchant.findOne({ userId: userId });
        if (!merchant) throw new Error('Merchant not found');

        const order = await Order.findById(orderId);
        if (!order) throw new Error('Order not found');

        merchant.orderRejectedList.push(order._id);
        await merchant.save();

        return { message: 'Order declined' };
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const _createLastWeekReport = async () => {
    const today = dayjs().tz('Asia/Kolkata');
    const lastWeek = today.subtract(1, 'week');
    const merchants = await Merchant.find({}).populate('thisWeekOrders');

    for (let merchant of merchants) {
        let totalEarning = 0;
        const orders = merchant.thisWeekOrders;
        for (let order of orders) {
            totalEarning += order.totalShopAmount;
        }
        merchant.pastWeeksEarnings.push({
            duration: lastWeek.startOf('week').add(1, 'day').format('DD/MM/YYYY') + ' - ' + lastWeek.endOf('week').add(1, 'day').format('DD/MM/YYYY'),
            orders,
            totalEarning
        });
        merchant.thisWeekOrders = [];
        await merchant.save();
    }
}

const _createLastMonthReport = async () => {
    const today = dayjs().tz('Asia/Kolkata');
    const lastMonth = today.subtract(1, 'month');
    const merchants = await Merchant.find({}).populate('thisMonthOrders');

    for (let merchant of merchants) {
        let totalEarning = 0;
        const orders = merchant.thisMonthOrders;
        for (let order of orders) {
            totalEarning += order.totalShopAmount;
        }
        merchant.pastMonthsEarnings.push({
            duration: lastMonth.startOf('month').format('DD/MM/YYYY') + ' - ' + lastMonth.endOf('month').format('DD/MM/YYYY'),
            orders,
            totalEarning
        });
        merchant.thisMonthOrders = [];
        await merchant.save();
    }
}

const _createLastDayReport = async () => {
    const today = dayjs().tz('Asia/Kolkata');
    const lastDay = today.subtract(1, 'day');
    const merchants = await Merchant.find({}).populate('thisDayOrders');

    for (let merchant of merchants) {
        let totalEarning = 0;
        const orders = merchant.thisDayOrders;
        for (let order of orders) {
            totalEarning += order.totalShopAmount;
        }
        merchant.pastDaysEarnings.push({
            duration: lastDay.format('DD/MM/YYYY') + ' - ' + lastDay.format('DD/MM/YYYY'),
            orders,
            totalEarning
        });
        merchant.thisDayOrders = [];
        await merchant.save();
    }
}

const _createLastYearReport = async () => {
    const today = dayjs().tz('Asia/Kolkata');
    const lastYear = today.subtract(1, 'year');
    const merchants = await Merchant.find({}).populate('thisYearOrders');

    for (let merchant of merchants) {
        let totalEarning = 0;
        const orders = merchant.thisYearOrders;
        for (let order of orders) {
            totalEarning += order.totalShopAmount;
        }
        merchant.pastYearsEarnings.push({
            duration: lastYear.startOf('year').format('DD/MM/YYYY') + ' - ' + lastYear.endOf('year').format('DD/MM/YYYY'),
            orders,
            totalEarning
        });
        merchant.thisYearOrders = [];
        await merchant.save();
    }
}

cron.schedule('0 0 * * 1', _createLastWeekReport);
cron.schedule('0 0 1 * *', _createLastMonthReport);
cron.schedule('0 0 * * *', _createLastDayReport);
cron.schedule('0 0 1 1 *', _createLastYearReport);

module.exports = { show, update, list, isAvailable, create, getOrders, updateOrderStatus, myOrders, earning, declineOrder, pastEarnings }
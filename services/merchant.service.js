const dayjs = require('dayjs');
const User = require('../models/user.model');
const Merchant = require('../models/merchant.model');
const { MERCHANT } = require('../constants/userRole');
const Order = require('../models/order.model');
const { PENDING, DELIVERED } = require('../constants/orderStatus');
const { DELIVERY_FEE } = require('../constants/deliveryFee.js');

const { initializeApp } = require('firebase/app')
const config = require('../config/firebase.config.js');
initializeApp(config.firebaseConfig)

const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')
const storage = getStorage();

const show = async ({ merchantId }) => {
    try {
        const merchant = await Merchant.findById(merchantId);
        if (!merchant) throw new Error('Merchant not found');

        return merchant;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const update = async ({ body }) => {
    try {
        const merchant = await Merchant.findByIdAndUpdate({
            _id: body.merchantId
        },
            {
                $set: {
                    isAvailable: body.isAvailable,
                    isVerified: body.isVerified
                }
            },
            {
                new: true
            });
        if (!merchant) throw new Error('Merchant not found');

        return { message: 'Status updated successfully' };
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

const getOrders = async ({ merchantId, orderStatus }) => {
    try {
        const merchant = await Merchant.findById(merchantId);
        if (!merchant) throw new Error('Merchant not found');
        if (!merchant.isAvailable) throw new Error('Merchant not available');

        const orders = await Order.find({ city: merchant.city, status: orderStatus }).populate('items.product');

        return orders;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const updateOrderStatus = async ({ merchantId, data }) => {
    try {
        const order = await Order.findById(data.orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        const merchant = await Merchant.findById(merchantId);
        if (!merchant) throw new Error('Merchant not found');

        order.status = data.status;
        await order.save();

        merchant.orderAcceptedList.push(order._id);
        await merchant.save();

        return { message: 'Order status updated' };
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const myOrders = async ({ merchantId }) => {
    try {
        const merchant = await Merchant.findById(merchantId).populate('orderAcceptedList');
        if (!merchant) throw new Error('Merchant not found');

        return merchant.orderAcceptedList;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const earning = async ({ merchantId }) => {
    try {
        const merchant = await Merchant.findById(merchantId).populate('orderAcceptedList');
        if (!merchant) throw new Error('Merchant not found');

        const orders = merchant.orderAcceptedList.filter(order => order.status === DELIVERED);

        const today = dayjs();
        let todayEarning = 0, weekEarning = 0;
        const todayOrders = [], weekOrders = [];

        for (let order of orders) {
            if (dayjs(order.createdAt).isSame(today, 'day')) {
                todayEarning += order.totalShopAmount + DELIVERY_FEE;
                todayOrders.push({
                    orderId: order._id,
                    createdAt: dayjs(order.createdAt).format('D MMMM YYYY, hh:mm A'),
                    amount: order.totalShopAmount + DELIVERY_FEE
                });
            }

            if (dayjs(order.createdAt).isSame(today, 'week')) {
                weekEarning += order.totalShopAmount + DELIVERY_FEE;
                weekOrders.push({
                    orderId: order._id,
                    createdAt: dayjs(order.createdAt).format('D MMMM YYYY, hh:mm A'),
                    amount: order.totalShopAmount + DELIVERY_FEE
                });
            }
        }

        return { todayEarning, todayOrders, weekEarning, weekOrders };
    }
    catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { show, update, list, isAvailable, create, getOrders, updateOrderStatus, myOrders, earning }
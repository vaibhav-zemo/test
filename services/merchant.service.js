const User = require('../models/user.model');
const Merchant = require('../models/merchant.model');
const { MERCHANT } = require('../constants/userRole');

const { initializeApp } = require('firebase/app')
const config = require('../config/firebase.config.js');
initializeApp(config.firebaseConfig)

const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')
const storage = getStorage();

const show = async ({ userId }) => {
    try {
        const merchant = await Merchant.findOne({ userId: userId });
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

const isAvailable = async () => {
    try {
        const merchants = await Merchant.find({ isAvailable: true });
        console.log(merchants)
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

        user = await User.findOne({ email });
        if (user) throw new Error('Email already used');

        const dateTime = _giveCurrentDateTime();

        const storageRef = ref(storage, `files/${file.originalname + "" + dateTime}`);
        const metadata = {
            contentType: file.mimetype
        };

        const snapShot = await uploadBytesResumable(storageRef, file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapShot.ref);

        user = new User({ userName, email, role: MERCHANT, phoneNumber });
        user = await user.save();  

        const merchant = new Merchant({ userId: user._id, city, license: downloadURL});
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

module.exports = { show, update, list, isAvailable, create }
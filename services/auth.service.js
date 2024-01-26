const User = require('../models/user.model');
const request = require('request');
const { sendOtp } = require('../mailers/otp.mailer');

const create = async ({ phoneNumber, mail }) => {
    try {
        const otp = _generateOTP(6);
        if (mail) {
            sendOtp(otp, mail);
            return { otp };
        }
        const user = await User.findOne({ phoneNumber });

        _sendOTP(otp, phoneNumber);
        return { userId: user?._id, otp };
    } catch (error) {
        throw new Error(error.message);
    }
}

const _generateOTP = (otp_length) => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < otp_length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const _sendOTP = async (otp, phoneNumber) => {
    const options = {
        method: 'POST',
        url: 'https://api.authkey.io/request',
        qs:
        {
            authkey: process.env.OTPAUTHKEY,
            mobile: phoneNumber,
            country_code: '+91',
            sid: '11137',
            company: 'cakelaya',
            otp: otp,
        },
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
}

module.exports = {
    create
}
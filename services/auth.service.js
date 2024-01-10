const User = require('../models/user.model');
const request = require('request');

const create = async ({ phoneNumber }) => {
    const user = await User.findOne({ phoneNumber });
    const otp = _generateOTP(6);

    // _sendOTP(otp, phoneNumber);
    return {userId: user?._id, otp};
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
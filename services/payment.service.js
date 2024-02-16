require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const axios = require('axios');

const verifyPayment = async ({ body }) => {
    try {
        const options = {
            method: 'GET',
            url: `https://sandbox.cashfree.com/pg/orders/${body.orderId}`,
            headers: {
                accept: 'application/json',
                'x-api-version': '2023-08-01',
                'x-client-id': process.env.TEST_CASHFREE_CLIENT_ID,
                'x-client-secret': process.env.TEST_CASHFREE_SECRET_KEY
            }
        };

        const res = await axios.request(options);
        return res.data;

    } catch (err) {
        throw new Error(err.message)
    }
}

const createOrder = async ({ body }) => {
    try {
        const options = {
            method: 'POST',
            url: 'https://sandbox.cashfree.com/pg/orders',
            headers: {
                accept: 'application/json',
                'x-api-version': '2023-08-01',
                'content-type': 'application/json',
                'x-client-id': process.env.TEST_CASHFREE_CLIENT_ID,
                'x-client-secret': process.env.TEST_CASHFREE_SECRET_KEY
            },
            data: {
                customer_details: {
                    customer_id: body.userId + Date.now(),
                    customer_phone: body.phone,
                    customer_name: body.name
                },
                order_amount: body.amount,
                order_id: 'ORID665456' + Date.now(),
                order_currency: 'INR',
            }
        };


        const res = await axios.request(options);
        return res.data

    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { verifyPayment, createOrder }

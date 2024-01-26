require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const verifyPayment = async ({ body }) => {
    try {
        const { order_id, razorpay_payment_id, razorpay_signature } = body;
        const sign = order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.TEST_RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return { message: "Payment verified successfully" };
        } else {
            return { message: "Invalid signature sent!" };
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

const createOrder = async ({ body }) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.TEST_RAZORPAY_KEY_ID,
            key_secret: process.env.TEST_RAZORPAY_KEY_SECRET,
        })

        const options = {
            amount: parseInt(body.amount) * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        const order = await instance.orders.create(options);
        if (!order) throw new Error("Some error occured while creating order");

        return order;
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { verifyPayment, createOrder }
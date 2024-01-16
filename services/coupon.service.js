const CouponCode = require('../models/couponCode.model')

const create = async ({ data, user }) => {
    try {
        const coupon = await CouponCode.findOne({ code: data.code })
        if (coupon) {
            throw new Error('Coupon code already exists')
        }

        const newCoupon = new CouponCode(data)
        newCoupon.createdBy = user._id
        newCoupon.updatedBy = user._id
        await newCoupon.save()

        return newCoupon
    } catch (error) {
        throw new Error(error)
    }
}

const update = async ({ id, data, user }) => {
    try {
        const coupon = await CouponCode.findByIdAndUpdate(id, { $set: data }, { new: true })
        if (!coupon) {
            throw new Error('Coupon code not found')
        }

        coupon.updatedBy = user._id
        await coupon.save()

        return coupon;
    } catch (error) {
        throw new Error(error)
    }
}

const list = async () => {
    try {
        const coupons = await CouponCode.find({ isActive: true })
        return coupons
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { create, update, list }
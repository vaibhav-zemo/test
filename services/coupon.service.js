const CouponCode = require('../models/couponCode.model')
const City = require('../models/city.model')
const dayjs = require('dayjs')

const create = async ({ data, user }) => {
    try {
        const coupon = await CouponCode.findOne({ code: data.code, city: data.city })
        if (coupon) {
            throw new Error('Coupon code already exists')
        }

        const city = await City.findOne({ name: data.city })
        if (!city) {
            throw new Error('City not found')
        }

        const newCoupon = new CouponCode(data)
        // newCoupon.createdBy = user._id
        // newCoupon.updatedBy = user._id
        await newCoupon.save()

        city.coupons.push(newCoupon._id)
        await city.save()

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

        // coupon.updatedBy = user._id
        await coupon.save()

        return coupon;
    } catch (error) {
        throw new Error(error)
    }
}

const list = async ({ city }) => {
    try {

        const searchCity = await City.findOne({ name: city }).populate('coupons')
        if (!searchCity) {
            throw new Error('City not found')
        }

        const currentDate = dayjs();
        const coupons = searchCity.coupons.filter(coupon => coupon.isActive && currentDate.isBefore(dayjs(coupon.expiryDate)))
        
        return coupons
    } catch (error) {
        throw new Error(error)
    }
}

const show = async ({ code }) => {
    try {
        const coupon = await CouponCode.findOne({ name: code });
        if (!coupon) {
            throw new Error('Coupon code not found')
        }

        const currentDate = dayjs();
        if (!currentDate.isBefore(dayjs(coupon.expiryDate))) {
            throw new Error('Coupon code expired')
        }

        if (!coupon.isActive) {
            throw new Error('Coupon code not active')
        }
        return coupon;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { create, update, list, show }
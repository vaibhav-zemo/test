const couponDetailedTransformer = {
    transform: (coupon) => {
        return {
            id: coupon?._id,
            code: coupon?.code,
            discountType: coupon?.discountType,
            flatDiscount: coupon?.flatDiscount,
            percentageDiscount: coupon?.percentageDiscount,
            maxDiscount: coupon?.maxDiscount,
            expiryDate: coupon?.expiryDate,
            isActive: coupon?.isActive,
            createdAt: coupon?.createdAt,
            updatedAt: coupon?.updatedAt
        }
    }
}

const couponTransformer = {
    transform: (coupon) => {
        return {
            id: coupon?._id,
            code: coupon?.code,
            discountType: coupon?.discountType,
            flatDiscount: coupon?.flatDiscount,
            percentageDiscount: coupon?.percentageDiscount,
            maxDiscount: coupon?.maxDiscount,
            description: coupon?.description,
        }
    }
}

const couponListTransformer = {
    transform: (couponList) => {
        const response = {}
        response.list = couponList.map(coupon => {
            return couponTransformer.transform(coupon)
        })
        return response
    }
}

module.exports = {couponTransformer, couponListTransformer, couponDetailedTransformer}
const dayjs = require('dayjs');

const orderDetailedTransformer = {
    transform: (order) => {
        return {
            id: order?._id,
            items: order?.items.map(item => {
                return {
                    productId: item?.product?._id,
                    name: item?.product?.name,
                    imageUrl: item?.product?.imageUrl,
                    price: item?.price,
                    shopPrice: item?.shopPrice,
                    weight: item?.weight,
                    message: item?.message,
                    occasion:  item?.occasion?.charAt(0).toUpperCase() + item?.occasion?.slice(1),
                    flavour: item?.flavour,
                    rating: item?.rating,
                    discount: item?.discount,
                }
            }),
            createdAt: dayjs(order?.createdAt).format('D MMMM YYYY, hh:mm A'),
            totalAmount: order?.totalAmount,
            totalShopAmount: order?.totalShopAmount,
            address: order?.address,
            status: order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1),
            note: order?.note,
            couponCode: order?.couponCode,
            mobileNumber: order?.phoneNumber,
        }
    }
}

const orderTransformer = {
    transform: (order) => {
        return {
            id: order?._id,
            createdAt: dayjs(order?.createdAt).format('D MMMM YYYY, hh:mm A'),
            status: order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1),
            orderName: order?.orderName + " +" + order?.items.length,
            address: order?.address,
            eta: dayjs(order?.createdAt).add(90, 'm').format('hh:mm A')
        }
    }
}

const orderListTransformer = {
    transform: (orderList) => {
        const response = {}
        response.list = orderList.map(order => {
            return orderTransformer.transform(order)
        })
        return response
    }
}

module.exports = {orderDetailedTransformer, orderTransformer, orderListTransformer};
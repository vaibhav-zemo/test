const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

// Extend Day.js with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

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
                    occasion: item?.occasion?.charAt(0).toUpperCase() + item?.occasion?.slice(1),
                    flavour: item?.flavour,
                    rating: item?.rating,
                    discount: item?.discount,
                }
            }),
            createdAt: dayjs(order?.createdAt).tz('Asia/Kolkata').format('D MMMM YYYY, hh:mm A'),
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
    transform: ({ order, isMerchant }) => {
        const transformedOrder = {
            id: order?._id,
            createdAt: dayjs(order?.createdAt).tz('Asia/Kolkata').format('D MMMM YYYY, hh:mm A'),
            status: order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1),
            orderName: order?.orderName + (order?.items?.length > 1 ? ` +${order?.items?.length - 1}` : ''),
            address: order?.address,
            eta: dayjs(order?.createdAt).add(90, 'm').format('hh:mm A'),
        }

        if(isMerchant) {
            transformedOrder.phoneNumber = order?.phoneNumber;
        }

        return transformedOrder;
    }
}

const orderListTransformer = {
    transform: ({ order: orderList, isMerchant }) => {
        const response = {}
        response.list = orderList.map(order => {
            return orderTransformer.transform({ order, isMerchant })
        })
        return response
    }
}

module.exports = { orderDetailedTransformer, orderTransformer, orderListTransformer };
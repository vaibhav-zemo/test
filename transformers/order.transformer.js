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
                    weight: item?.weight,
                    message: item?.message,
                    occasion:  item?.occasion?.charAt(0).toUpperCase() + item?.occasion?.slice(1),
                    flavour: item?.flavour,
                    rating: item?.rating,
                    discount: item?.discount,
                }
            }),
            createdAt: order?.createdAt,
            totalAmount: order?.totalAmount,
            address: order?.address,
            status: order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1),
            note: order?.note,
            couponCode: order?.couponCode,
        }
    }
}

const orderTransformer = {
    transform: (order) => {
        return {
            id: order?._id,
            createdAt: order?.createdAt,
            status: order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1),
            orderName: order?.orderName,
            address: order?.address,
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
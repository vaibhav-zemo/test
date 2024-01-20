const orderDetailedTransformer = {
    transform: (order) => {
        return {
            id: order._id,
            userId: order.userId,
            items: order.items.map(item => {
                return {
                    name: item.product.name,
                    imageUrl: item.product.imageUrl,
                    quantity: item.quantity,
                    price: item.price,
                    weight: item.weight,
                    message: item.message,
                    occasion: item.occasion,
                    flavour: item.flavour,
                    rating: item.rating,
                    discount: item.discount,
                }
            }),
            createdAt: order.createdAt,
            totalAmount: order.totalAmount,
            address: order.address,
            status: order.status,
            note: order.note,
            couponCode: order.couponCode,
        }
    }
}

const orderTransformer = {
    transform: (order) => {
        return {
            id: order._id,
            createdAt: order.createdAt,
            status: order.status,
            orderName: order?.items[0]?.product?.name,
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
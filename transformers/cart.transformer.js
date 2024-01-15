const cartTransformer = {
    transform: (cart) => {
        return {
            items: cart.items.map(item => {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    message: item.message,
                    weight: item.weight,
                    price: item.price,
                    discountedPrice: item.discountedPrice,
                }
            }),
            totalAmount: cart.totalAmount,
        }
    }
}

module.exports = { cartTransformer }
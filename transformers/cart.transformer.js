const cartTransformer = {
    transform: ({cart, remove, message}) => {
        return {
            items: cart?.items?.map(item => {
                return {
                    id: item?._id,
                    productId: item.product._id,
                    name: item?.product?.name,
                    imageUrl: item?.product?.imageUrl,
                    category: item?.product?.category?.name,
                    flavour: item?.flavour,
                    message: item?.message,
                    weight: item?.weight,
                    price: item?.price,
                    shopPrice: item?.shopPrice,
                    discount: item?.discount,
                    occasion: item?.occasion?.charAt(0).toUpperCase() + item?.occasion?.slice(1),
                }
            }),
            totalAmount: cart?.totalAmount,
            totalShopAmount: cart?.totalShopAmount,
            couponCode: cart?.couponCode,
            discountAmount: cart?.discountAmount,
            message: remove && message,
        }
    }
}

module.exports = { cartTransformer }
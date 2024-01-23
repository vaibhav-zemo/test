const cartTransformer = {
    transform: (cart) => {
        return {
            items: cart?.items?.map(item => {
                return {
                    id: item?._id,
                    name: item?.product.name,
                    imageUrl: item?.product?.imageUrl,
                    category: item?.product?.category?.name,
                    flavour: item?.flavour,
                    quantity: item?.quantity,
                    message: item?.message,
                    weight: item?.weight,
                    price: item?.price,
                    discount: item?.discount,
                    occasion: item?.occasion,
                }
            }),
            totalAmount: cart?.totalAmount,
        }
    }
}

module.exports = { cartTransformer }
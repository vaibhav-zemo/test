const categoryTransformer = {
    transform: (category) => {
        return {
            id: category?._id,
            name: category?.name,
            image: category?.imageUrl,
            price: category?.price,
        }
    }
}

const categoryListTransformer = {
    transform: (categoryList) => {
        const response = {}
        response.list = categoryList.map(category => {
            return categoryTransformer.transform(category)
        })
        return response
    }
}

const categoryDetailedTransformer = {
    transform: (category) => {
        return {
            id: category?._id,
            name: category?.name,
            products: category?.products?.map(product => {
                return {
                    id: product?._id,
                    name: product?.name,
                    image: product?.imageUrl,
                    price: product?.prices[0]?.shopPrice + product?.prices[0]?.platformFee,
                    shopPrice: product?.prices[0]?.shopPrice,
                    discountedPrice: Math.ceil((product?.prices[0]?.shopPrice + product?.prices[0]?.platformFee) * 1.25),
                    rating: product?.rating,
                    discount: product?.discount,
                    description: product?.description,
                    flavours: product?.flavours,
                    note: product?.note,
                    serving: product?.serving,
                    isFavourite: product?.isFavourite
                }
            })
        }
    }
}

module.exports = { categoryTransformer, categoryListTransformer, categoryDetailedTransformer }

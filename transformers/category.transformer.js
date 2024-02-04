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
    transform: (products) => {
        return {
            products: products?.map(product => {
                return {
                    id: product?._id,
                    name: product?.name,
                    image: product?.imageUrl,
                    price: product?.prices[0]?.price,
                    discountedPrice: Math.ceil(product?.prices[0]?.price * 1.25),
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
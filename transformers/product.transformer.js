const productTransformer = {
    transform: (product) => {
        return {
            id: product?._id,
            name: product?.name,
            image: product?.imageUrl,
            description: product?.description,
            note: product?.note,
            serving: product?.serving,
            rating: product?.rating,
            flavour: product?.flavours,
            discount: product?.discount,
            prices: product?.prices?.map(price => {
                return {
                    weight: price?.weight,
                    price: price?.shopPrice + price?.platformFee,
                    discountedPrice: Math.ceil((price?.shopPrice + price?.platformFee) * 1.25),
                    shopPrice: price?.shopPrice
                }
            })
        }
    }
}

const productListTransformer = {
    transform: (productList) => {
        const response = {}
        response.list = productList.map(product => {
            return productTransformer.transform(product)
        })
        return response
    }
}

module.exports = { productTransformer, productListTransformer };

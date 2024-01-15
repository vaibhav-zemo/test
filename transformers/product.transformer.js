const productDetailedTransformer = {
    transform: (product) => {
        return {
            id: product._id,
            name: product.name,
            description: product.description,
            image: product.imageUrl,
            rating: product.rating,
            prices: product.prices.map(price => {
                return {
                    weight: price.weight,
                    price: price.price,
                    discountedPrice: price.discountedPrice,
                }
            }),
            flavour: product.flavour,
        }
    }
}

const productTransformer = {
    transform: (product) => {
        return {
            id: product._id,
            name: product.name,
            image: product.imageUrl,
            price: product.price,
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

module.exports = { productTransformer, productListTransformer, productDetailedTransformer };
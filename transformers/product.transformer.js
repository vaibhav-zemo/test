const productTransformer = {
    transform: (product) => {
        return {
            id: product._id,
            name: product.name,
            description: product.description,
            image: product.imageUrl,
            rating: product.rating,
            category: product.category,
            price: product.price,
            discountedPrice: product.discountedPrice,
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
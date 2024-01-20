const categoryTransformer = {
    transform: (category) => {
        return {
            id: category._id,
            name: category.name,
            image: category.imageUrl,
            price: category.price,
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
            id: category._id,
            name: category.name,
            products: category.products.map(product => {
                return {
                    id: product._id,
                    name: product.name,
                    image: product.imageUrl,
                    price: product.prices[0].price,
                    rating: product.rating,
                    discount: product.discount,
                }
            })
        }
    }
}

module.exports = { categoryTransformer, categoryListTransformer, categoryDetailedTransformer }
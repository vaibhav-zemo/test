const favouriteTransformer = {
    transform: (favourite) => {
        return {
            id: favourite._id,
            name: favourite.name,
            imageUrl: favourite.imageUrl,
            rating: favourite.rating,
            price: favourite.prices[0].price,
        }
    }
}

const favouriteListTransformer = {
    transform: (favourites) => {
        const response = {}
        response.list = favourites.map((favourite) => {
            return favouriteTransformer.transform(favourite);
        })
        return response
    }
}

module.exports = { favouriteTransformer, favouriteListTransformer };
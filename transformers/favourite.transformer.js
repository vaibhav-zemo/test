const favouriteTransformer = {
    transform: (favourite) => {
        return {
            id: favourite._id,
            name: favourite.name,
            imageUrl: favourite.imageUrl,
            rating: favourite.rating,
            price: favourite.prices[0].shopPrice + favourite.prices[0].platformFee,
            discountedPrice: Math.ceil(avourite.prices[0].shopPrice + favourite.prices[0].platformFee * 1.25),
            discount: favourite.discount,
            description: favourite.description,
            flavours: favourite.flavours,
            note: favourite.note,
            serving: favourite.serving,
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
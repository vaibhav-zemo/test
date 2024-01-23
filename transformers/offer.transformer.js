const offerTransformer = {
    transform: (offer) => {
        return {
            title: offer?.title,
            description: offer?.description,
            imageUrl: offer?.imageUrl,
        }
    }
}

const offerListTransformer = {
    transform: (offers) => {
        const response = {}
        response.list = offers.map(offer => {
            return offerTransformer.transform(offer)
        })
        return response
    }
}

module.exports = { offerTransformer, offerListTransformer }
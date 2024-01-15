const cityTransformer = {
    transform: (city) => {
        return {
            name: city.name,
        }
    }
}

const cityListTransformer = {
    transform: (cityList) => {
        const response = {}
        response.list = cityList.map(city => {
            return cityTransformer.transform(city)
        })
        return response
    }
}

module.exports = { cityTransformer, cityListTransformer };
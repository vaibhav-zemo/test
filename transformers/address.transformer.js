const addressTransformer = {
    transform: (address) => {
        return {
            houseNumber: address.houseNumber,
            area: address.area,
            city: address.city,
            state: address.state,
            pinCode: address.pinCode,
            id: address._id
        }
    }
}

const addressListTransformer = {
    transform: (addressList) => {
        const response = {}
        response.list = addressList.map(address => {
            return addressTransformer.transform(address)
        })
        return response
    }
}

module.exports = {addressTransformer, addressListTransformer}
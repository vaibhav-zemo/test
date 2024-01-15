const City = require('../models/city.model')
const list = async () => {
    try {
        return await City.find();
    }
    catch (err) {
        throw new Error(err)
    }
}

const show = async ({city}) => {
    try {
        const searchCity = await City.findOne({name: city}).populate('products');

        if(!searchCity) throw new Error("City not found");

        return searchCity.products;
    }   
    catch (err) {
        throw new Error(err)
    }
}

module.exports = { show, list }
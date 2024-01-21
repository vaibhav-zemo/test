const City = require('../models/city.model')
const Product = require('../models/product.model')
const Category = require('../models/category.model')
const CouponCode = require('../models/couponCode.model')
const list = async () => {
    try {
        return await City.find();
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const create = async ({name}) => {
    try {
        const newCity = new City({name});
        return await newCity.save();
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const remove = async ({id}) => {
    try {
        const city = await City.findById(id);
        if(!city) throw new Error("City not found");

        for(let product of city.products){
            await Product.findByIdAndDelete(product);
        }

        for(let category of city.categories){
            await Category.findByIdAndDelete(category);
        }

        for(let coupon of city.coupons){
            await CouponCode.findByIdAndDelete(coupon);
        }

        await City.findByIdAndDelete(id);
        return;
    }
    catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { list, create, remove }
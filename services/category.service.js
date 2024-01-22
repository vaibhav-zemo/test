const Category = require('../models/category.model');
const City = require('../models/city.model');

const list = async ({city}) => {
    try {
        const searchCity = await City.findOne({name: city}).populate('categories')
        if(!searchCity) throw new Error('City not found')
        return searchCity.categories;
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const create = async ({ name, imageUrl, price, city }) => {
    try {
        const searchCity = await City.findOne({ name: city });
        if (!searchCity) {
            throw new Error("City not found")
        }

        const data = {
            name,
            imageUrl,
            price,
            city: searchCity._id
        }
        const category = new Category(data)
        await category.save()

        searchCity.categories.push(category._id)
        await searchCity.save()

        return category;
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const remove = async ({ id }) => {
    try {
        const category = await Category.findById(id)
        if (!category) {
            throw new Error("Category not found")
        
        }

        const city = await City.findById(category.city)
        if (!city) {
            throw new Error("City not found")
        }

        city.categories.pull(category)
        await city.save()

        await Category.findByIdAndDelete(id)
        return { message: "Category deleted successfully" };
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const update = async ({ id, data }) => {
    try {
        const category = await Category.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );

        if (!category) {
            throw new Error("Category not found")
        }
        return category;
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const show = async ({ id }) => {
    try {
        const category = await Category.findById(id).populate('products')
        if (!category) {
            throw new Error("Category not found")
        }
        return category;
    }
    catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { list, create, remove, update, show }
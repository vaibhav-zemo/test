const Category = require('../models/category.model');
const City = require('../models/city.model');
const Customer = require('../models/customer.model');
const csv = require('csvtojson');

const list = async ({ city }) => {
    try {
        const searchCity = await City.findOne({ name: city }).populate('categories')
        if (!searchCity) throw new Error('City not found')
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

const show = async ({ categoryId, userId }) => {
    try {
        const category = await Category.findById(categoryId).populate('products')
        if (!category) {
            throw new Error("Category not found")
        }
        // const customer = await Customer.findOne({ userId: userId }).populate('favourites');
        return category;
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const bulkUpload = async ({ file }) => {
    try {
        csv()
            .fromString(file.buffer.toString())
            .then(async (json) => {
                for (let category of json) {
                    const searchCity = await City.findOne({ name: category.city })
                    if (!searchCity) throw new Error('City not found')
                }

                for (let category of json) {
                    const searchCity = await City.findOne({ name: category.city })
                    const data = {
                        name: category.name,
                        imageUrl: category.imageUrl,
                        price: category.price,
                        city: searchCity._id
                    }

                    const newCategory = new Category(data)
                    await newCategory.save()

                    searchCity.categories.push(newCategory._id)
                    await searchCity.save()
                }

            })
            .catch((err) => {
                throw new Error(err.message)
            })

        return { message: "Categories uploaded successfully" }
    
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { list, create, remove, update, show, bulkUpload }
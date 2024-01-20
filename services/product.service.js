const Product = require('../models/product.model.js')
const City = require('../models/city.model.js')
const Category = require('../models/category.model.js')

const create = async ({ data }) => {
    try {

        let city = await City.findOne({ name: data.city }).populate('categories')
        if (!city) {
            throw new Error('City not found')
        }

        const categories = await Category.find({ city: city._id });

        let id;
        for (let category of categories) {
            if (category.name === data.product.category) {
                id = category._id;
                break;
            }
        }
        
        const category = await Category.findById(id)
        if (!category) {
            throw new Error('Category not found')
        }

        data.product.flavours = data.product.flavours.split(' ')
        data.product.category = category._id
        
        const product = new Product(data.product)
        product.city = city
        await product.save()

        city.products.push(product)
        await city.save()

        category.products.push(product)
        await category.save()

        return product
    } catch (error) {
        throw new Error(error.message)
    }
}

const list = async () => {
    try {
        return await Product.find()
    } catch (error) {
        throw new Error(error.message)
    }
}

const show = async ({ id }) => {
    try {
        return await Product.findById(id)
    } catch (error) {
        throw new Error(error.message)
    }
}

const remove = async ({ id }) => {
    try {
        const product = await Product.findById(id)
        if (!product) throw new Error('Product not found')

        const city = await City.findById(product.city)
        if (!city) throw new Error('City not found')

        const category = await Category.findById(product.category)
        if (!category) throw new Error('Category not found')

        category.products.pull(product)
        await category.save()

        city.products.pull(product)
        await city.save()

        return await Product.findByIdAndDelete(id)
    } catch (error) {
        throw new Error(error.message)
    }
}

const update = async ({ id, data }) => {
    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );

        if (!product) {
            throw new Error("Product not found")
        }
        return product;
    }
    catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { create, show, list, remove, update }
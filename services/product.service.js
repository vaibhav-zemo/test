const Product = require('../models/product.model.js')
const City = require('../models/city.model.js')
const Category = require('../models/category.model.js')
const csv = require('csvtojson')

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

        if (data.product.flavours) data.product.flavours = data.product.flavours.split(' ')
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

const list = async ({ city }) => {
    try {
        const searchCity = await City.findOne({ name: city }).populate('products')
        if (!searchCity) throw new Error('City not found')

        return searchCity.products;
    } catch (error) {
        throw new Error(error.message)
    }
}

const show = async ({ id }) => {
    try {
        const product = await Product.findById(id)
        if (!product) throw new Error('Product not found')

        return product
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

        await Product.findByIdAndDelete(id)
        return { message: "Product deleted successfully" }
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


const bulkCreate = async ({ file }) => {
    try {
        csv()
            .fromString(file.buffer.toString())
            .then(async (products) => {

                for (let product of products) {
                    const { city, category, name, description, imageUrl, shopPrice, platformFees, weight, flavours, discount, note, serving } = product;

                    const searchCity = await City.findOne({ name: city });
                    const searchCategory = await Category.findOne({ name: category });

                    const splitShopPrice = shopPrice.split(', ');
                    const splitPlatformFees = platformFees.split(', ');
                    const splitWeight = weight.split(', ');

                    let prices = [];
                    for (let i = 0; i < splitShopPrice.length; i++) {
                        prices.push({
                            weight: splitWeight[i],
                            shopPrice: splitShopPrice[i],
                            platformFee: splitPlatformFees[i]
                        })
                    }

                    const newProduct = new Product({
                        name: name,
                        description: description,
                        imageUrl: imageUrl,
                        category: searchCategory,
                        prices: prices,
                        flavours: flavours?.split(', '),
                        city: searchCity,
                        discount: discount,
                        note: note,
                        serving: serving
                    });
                    await newProduct.save();

                    searchCity.products.push(newProduct);
                    await searchCity.save();

                    searchCategory.products.push(newProduct);
                    await searchCategory.save();

                }

            })
            .catch((err) => {
                throw new Error(err.message)
            })

        return { message: 'Products added successfully' }
    }
    catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { create, show, list, remove, update, bulkCreate }
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

const bulkCreate = async ({ data }) => {
    try {
        for (let product of data) {
            const { city, category } = product;

            const searchCity = await City.findOne({name: city});
            if (!searchCity) throw new Error('City not found')

            const searchCategory = await Category.findOne({name: category, city: searchCity});
            if (!searchCategory) throw new Error('Category not found')
        }

        for(let product of data) {
            const { city, category, name, description, imageUrl, price, shopPrice, weight, flavours, discount } = product;

            const searchCity = await City.findOne({name: city});
            const searchCategory = await Category.findOne({name: category});

            const searchProduct = await Product.findOne({name: name, city: searchCity, category: searchCategory, imageUrl: imageUrl});
            if (searchProduct){
                const priceData = {
                    weight: weight,
                    shopPrice: shopPrice,
                    price: price
                }
                searchProduct.prices.push(priceData);
                await searchProduct.save();
            }
            else{
                const newProduct = new Product({
                    name: name,
                    description: description,
                    imageUrl: imageUrl,
                    category: searchCategory,
                    prices: [{
                        weight: weight,
                        shopPrice: shopPrice,
                        price: price
                    }],
                    flavours: flavours.split(' '),
                    city: searchCity,
                    discount: discount                
                });
                await newProduct.save();

                searchCity.products.push(newProduct);
                await searchCity.save();

                searchCategory.products.push(newProduct);
                await searchCategory.save();
            }
        }
        return { message: "Products added successfully" }
    }
    catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { create, show, list, remove, update, bulkCreate }
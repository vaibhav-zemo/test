const Product = require('../models/product.model.js')
const City = require('../models/city.model.js')
const Category = require('../models/category.model.js')

const create = async ({data}) => {
    try {
        
        let city = await City.findOne({name: data.city})
        if (!city){
            city = new City({name: data.city})
        }
        
        let category = await Category.findOne({name: data.product.category})
        if(!category){
            category = new Category({name: data.product.category})
        }
        const product = new Product(data.product)
        await product.save()
        
        city.products.push(product)
        await city.save()
        
        category.products.push(product)
        await category.save()

        return product
    } catch (error) {
       console.log(error)
    }
}

const list = async () => {
    try {
        return await Product.find()
    } catch (error) {
        console.log(error)
    }
}

const show = async ({id}) => {
    try {
        return await Product.findById(id)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { create, show, list }
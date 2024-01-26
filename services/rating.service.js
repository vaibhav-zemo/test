const Order = require('../models/order.model');
const Product = require('../models/product.model');

const create = async ({ orderId, products }) => {
    try {
        const order = await Order.findById(orderId).populate('items.product');
        if (!order) {
            throw new Error('Order not found');
        }

        let productMap = {}
        for(let product of products){
            const searchProduct = await Product.findById(product.productId);
            if(!searchProduct){
                throw new Error('Product not found');
            }
            productMap[product.productId] = product.rating;
        }

        for(let item of order.items){
            if(!(item.product._id in productMap)){
                throw new Error('Product not found in order');
            }
        }
        
        for(let product of products){
            const searchProduct = await Product.findById(product.productId);
            const ratedUsers = searchProduct.ratedUsers + 1;
            const rating = ((searchProduct.rating * searchProduct.ratedUsers) + product.rating) / ratedUsers;
            searchProduct.rating = Math.ceil(rating);
            searchProduct.ratedUsers = ratedUsers;
            await searchProduct.save();
        }

        for(let item of order.items){
            if(item.product._id in productMap){
                item.rating = productMap[item.product._id];
            }
        }

        await order.save();
        return { message: 'Rating added successfully'}
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { create }
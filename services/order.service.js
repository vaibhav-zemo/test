const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

const create = async ({data}) => {
    try {
        const user = await User.findById(data.userId);
        if (!user) {
            throw new Error('User not found');
        }
        
        const productIds = data.items.map(item => item.productId);
        const products = await Product.find({_id: {$in: productIds}});
        if (products.length !== productIds.length) {
            throw new Error('Product not found');
        }

        const order = new Order(data);
        await order.save();

        return order;
    } catch (error) {
        console.log(error)
    }
}

const show = async ({id}) => {
    try {
        const order = await Order.findById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    } catch (error) {
        console.log(error)
    }
}

const list = async () => {
    try {
        const orders = await Order.find().populate('items.productId');
        return orders;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { create, list, show }
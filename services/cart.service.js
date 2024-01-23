const Cart = require('../models/cart.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')

const create = async ({ userId, item }) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found')
        }

        const product = await Product.findById(item.productId);
        if (!product) {
            throw new Error('Product not found')
        }
        
        let cart = await Cart.findOne({userId}).populate({
            path: 'items',
            populate: {
                path: 'product',
                populate: {
                    path: 'category'
                }
            }
        });

        item.product = item.productId;
        if (cart) {
            cart.totalAmount += item.price * item.quantity;
            cart.items.push(item)
            await cart.save()
        }
        else {
            cart = new Cart({ userId });
            cart.items.push(item);
            cart.totalAmount = item.price * item.quantity;
            await cart.save()
        }

        return cart;
    } catch (error) {
        throw new Error(error)
    }
}

const show = async ({ userId }) => {
    try {
        const cart = await Cart.findOne({ userId: userId }).populate({
            path: 'items',
            populate: {
                path: 'product',
                populate: {
                    path: 'category'
                }
            }
        });

        if (!cart) {
            throw new Error('Cart not found')
        }

        return cart;
    }
    catch (error) {
        throw new Error(error)
    }
}

const update = async ({ userId, data }) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found')
        }

        const cart = await Cart.findOne({ userId: userId }).populate({
            path: 'items',
            populate: {
                path: 'product',
                populate: {
                    path: 'category'
                }
            }
        });
        
        if (!cart) {
            throw new Error('Cart not found')
        }

        if (data.item) {

            data.item.product = data.item.productId;
            let amount = data.item.price * data.item.quantity;
            cart.items.push(data.item)
            cart.totalAmount += amount;
        }
        else if (data.query) {
            const itemId = data.query.itemId;
            const quantity = data.query.quantity;

            const index = cart.items.findIndex(item => item._id == itemId);
            if (index == -1) {
                throw new Error('Item not found')
            }
            const item = cart.items[index];
            const prevQuantity = item.quantity;
            cart.items[index].quantity = quantity;
            if (quantity == 0) {
                cart.items.pull(itemId)
            }
            const amount = item.price * quantity - item.price * prevQuantity;
            cart.totalAmount += amount;
        }

        await cart.save()
        return cart;

    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { create, show, update }
const Cart = require('../models/cart.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')

const create = async ({ userId, item }) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found')
        }

        const cart = new Cart({ userId });
        await cart.save();

        return cart;
    } catch (error) {
        throw new Error(error)
    }
}

const show = async ({ userId }) => {
    try {
        const cart = await Cart.findOne({ userId }).populate({
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

        data.item.product = data.item.productId;
        let amount = data.item.price;
        cart.items.push(data.item)
        cart.totalAmount += amount;

        await cart.save()
        return cart;
    } catch (error) {
        throw new Error(error)
    }
}

const remove = async ({ userId, itemId }) => {
    try {
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            throw new Error('Cart not found')
        }

        if(itemId){
            for(let item of cart.items){
                if(item._id == itemId){
                    cart.totalAmount -= item.price;
                    cart.items.pull(item._id);
                    await cart.save();
                    return {message: 'Item remove successfully'}
                }
            }
        }

        await Cart.findByIdAndDelete(cart._id)
        return { message: 'Cart deleted successfully' }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { create, show, update, remove }
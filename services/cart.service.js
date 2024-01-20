const Cart = require('../models/cart.model')
const User = require('../models/user.model')

const create = async ({ data }) => {
    try {
        const user = await User.findById(data.userId);
        if (!user) {
            throw new Error('User not found')
        }

        for (let item of data.items) {
            item.product = item.productId;
        }

        const cart = new Cart(data)
        let amount = 0;
        for (let item of cart.items) {
            amount += item.price * item.quantity
        }
        cart.totalAmount = amount;
        await cart.save()

        return cart;
    } catch (error) {
        throw new Error(error)
    }
}

const show = async ({ userId }) => {
    try {
        const cart = await Cart.findOne({ userId: userId }).populate('items.product');
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

        const cart = await Cart.findOne({ userId: userId }).populate('items.product');
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
            if(quantity == 0){
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
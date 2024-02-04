const Cart = require('../models/cart.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')
const Coupon = require('../models/coupon.model')
const discountType = require('../constants/discountType')

const create = async ({ userId, item }) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found')
        }

        const cart = new Cart({ userId });
        await cart.save();

        return { message: 'Cart created successfully' };
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

        return { cart };
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

        const { couponCode, item } = data;

        if (item) {
            const product = await Product.findById(item.productId);
            data.item.product = product;
            let amount = data.item.price;
            cart.items.push(data.item)

            cart.totalAmount += amount;
            cart.totalShopAmount += data.item.shopPrice;

            await cart.save()
            const newItem = cart.items[cart.items.length - 1];
            return { id: newItem._id }
        }
        else {

            if (!couponCode) {
                cart.couponCode = '';
                cart.discountAmount = 0;
                await cart.save();
                return { message: 'Coupon removed successfully', remove: true }
            }

            const coupon = await Coupon.findOne({ code: couponCode });
            if (!coupon) {
                throw new Error('Coupon code not found')
            }

            if (couponCode) {
                cart.couponCode = coupon.code;
                if (coupon.discountType == discountType.FLAT) {
                    cart.discountAmount = coupon.flatDiscount;
                }
                else {
                    cart.discountAmount = Math.min(Math.ceil(cart.totalAmount * coupon.percentageDiscount / 100), coupon.maxDiscount);
                }
            }
            await cart.save();
            return { message: 'Coupon applied successfully' }
        }
                
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

        if (itemId) {
            for (let item of cart.items) {
                if (item._id == itemId) {
                    cart.totalAmount -= item.price;
                    cart.totalShopAmount -= item.shopPrice;
                    cart.items.pull(item._id);
                    await cart.save();
                    return { message: 'Item remove successfully' }
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

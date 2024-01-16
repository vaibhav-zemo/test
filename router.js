const express = require('express')
const router = express.Router()
const userRoute = require('./routers/user.router')
const authRoute = require('./routers/auth.router')
const productRoute = require('./routers/product.router')
const cityRoute = require('./routers/city.router')
const cartRoute = require('./routers/cart.router')
const couponRoute = require('./routers/coupon.router')
const orderRoute = require('./routers/order.router')

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/city', cityRoute)
router.use('/cart', cartRoute)
router.use('/coupon', couponRoute)
router.use('/order', orderRoute)

module.exports = router
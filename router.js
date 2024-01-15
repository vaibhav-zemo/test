const express = require('express')
const router = express.Router()
const userRoute = require('./routers/user.router')
const authRoute = require('./routers/auth.router')
const productRoute = require('./routers/product.router')
const cityRoute = require('./routers/city.router')
const cartRoute = require('./routers/cart.router')

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/city', cityRoute)
router.use('/cart', cartRoute)

module.exports = router
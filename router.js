const express = require('express')
const router = express.Router()
const userRoute = require('./routers/user.router')
const authRoute = require('./routers/auth.router')
const productRoute = require('./routers/product.router')
const cityRoute = require('./routers/city.router')

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/city', cityRoute)

module.exports = router
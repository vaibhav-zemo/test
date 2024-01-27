const express = require('express')
const router = express.Router()
const couponController = require('../controllers/coupon.controller')

router.post('/', couponController.create)
router.put('/:id', couponController.update)
router.get('/', couponController.list)
router.get('/:code', couponController.show)
router.delete('/:id', couponController.remove)

module.exports = router
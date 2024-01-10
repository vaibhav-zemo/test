const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post('/getOtp', authController.create)

module.exports = router
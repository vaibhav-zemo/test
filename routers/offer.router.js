const express = require('express')
const router = express.Router()
const offerController = require('../controllers/offer.controller.js')

router.post('/', offerController.create)
router.get('/', offerController.list)

module.exports = router
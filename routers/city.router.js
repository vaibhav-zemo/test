const express = require('express')
const router = express.Router()
const cityController = require('../controllers/city.controller')

router.get('/:city', cityController.show);
router.get('/', cityController.list);

module.exports = router
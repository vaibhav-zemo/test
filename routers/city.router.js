const express = require('express')
const router = express.Router()
const cityController = require('../controllers/city.controller')

router.get('/:city', cityController.show);
router.get('/', cityController.list);
router.post('/', cityController.create);
router.delete('/:id', cityController.remove);

module.exports = router
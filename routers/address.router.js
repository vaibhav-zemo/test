const express = require('express')
const router = express.Router();
const addressController = require('../controllers/address.controller')

router.post('/', addressController.create);
router.put('/:addressId', addressController.update);
router.delete('/:addressId', addressController.remove);
module.exports = router;
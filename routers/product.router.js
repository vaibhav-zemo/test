const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/', productController.create)
router.get('/', productController.list)
router.get('/:id', productController.show)
router.delete('/:id', productController.remove)
router.put('/:id', productController.update)
router.post('/bulkUpload', productController.bulkUpload)

module.exports = router;
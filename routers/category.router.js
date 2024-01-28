const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')

router.get('/', categoryController.list);
router.get('/:id', categoryController.show);
router.post('/', categoryController.create);
router.post('/bulkUpload', categoryController.bulkUpload);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.remove);

module.exports = router
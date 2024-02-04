const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', categoryController.list);
router.get('/:categoryId/:userId', categoryController.show);
router.post('/', categoryController.create);
router.post('/bulkUpload', upload.single("file"), categoryController.bulkUpload);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.remove);

module.exports = router
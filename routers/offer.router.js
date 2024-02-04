const express = require('express')
const router = express.Router()
const offerController = require('../controllers/offer.controller.js')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', offerController.create)
router.get('/', offerController.list)
router.put('/:id', offerController.update)

router.post('/bulkUpload', upload.single("file"), offerController.bulkUpload)

module.exports = router
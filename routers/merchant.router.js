const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchant.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.get('/profile/:merchantId', merchantController.show);
router.get('/list', merchantController.list);
router.put('/changeStatus', merchantController.update);
router.get('/isAvailable', merchantController.isAvailable);

router.post('/profile', upload.single("license"), merchantController.create)
router.get('/orders', merchantController.orders)

module.exports = router;
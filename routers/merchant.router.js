const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchant.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.get('/profile/:merchantId', merchantController.show);
router.get('/list', merchantController.list);
router.get('/isAvailable', merchantController.isAvailable);
router.get('/orders/:merchantId/:orderStatus', merchantController.getOrders)
router.get('/myOrders/:merchantId', merchantController.myOrders)
router.get('/earning/:merchantId', merchantController.earning)

router.post('/profile', upload.single("license"), merchantController.create)
router.put('/changeStatus', merchantController.update);
router.put('/order/status/:merchantId', merchantController.updateOrderStatus)


module.exports = router;
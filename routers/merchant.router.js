const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchant.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.get('/profile/:userId', merchantController.show);
router.get('/list', merchantController.list);
router.get('/isAvailable/:city', merchantController.isAvailable);
router.get('/orders/:userId/:orderStatus', merchantController.getOrders)
router.get('/myOrders/:userId', merchantController.myOrders)
router.get('/earning/:userId', merchantController.earning)

router.post('/profile', upload.single("license"), merchantController.create)
router.put('/changeStatus', merchantController.update);
router.put('/order/status/:userId', merchantController.updateOrderStatus)

router.post('/order/decline/:userId', merchantController.declineOrder)

router.get('/pastEarnings/:userId/:duration', merchantController.pastEarnings);

module.exports = router;
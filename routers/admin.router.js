const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/current-orders', adminController.currentOrders);
router.get('/orders', adminController.listOrders);
router.get('/users', adminController.listUsers);

module.exports = router
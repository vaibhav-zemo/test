const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/orders', adminController.listOrders);

module.exports = router
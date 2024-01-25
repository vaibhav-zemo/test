const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/', orderController.create);
router.get('/:id', orderController.show);
router.get('/', orderController.list);
router.put('/:id', orderController.update);

module.exports = router
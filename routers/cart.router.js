const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/', cartController.create);
router.get('/:userId', cartController.show);
router.put('/:userId', cartController.update);

module.exports = router;
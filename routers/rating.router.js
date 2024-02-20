const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');

router.post('/:orderId', ratingController.create);
router.get('/:userId/:productId', ratingController.show)

module.exports = router;
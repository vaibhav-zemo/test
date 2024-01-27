const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchant.controller');

router.get('/profile/:userId', merchantController.show);
router.get('/list', merchantController.list);
router.put('/changeStatus', merchantController.update);
router.get('/isAvailable', merchantController.isAvailable);

module.exports = router;
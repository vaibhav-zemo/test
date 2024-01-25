const express = require('express');
const router = express.Router();
const addonController = require('../controllers/addon.controller');

router.get('/', addonController.show);

module.exports = router;
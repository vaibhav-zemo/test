const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favourite.controller');

router.get('/',  favouriteController.list);
router.post('/',  favouriteController.create);
router.delete('/', favouriteController.remove);

module.exports = router;
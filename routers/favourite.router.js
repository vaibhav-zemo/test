const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favourite.controller');
const { checkAuth } = require('../middlewares/auth.middleware');

router.get('/', checkAuth, favouriteController.list);
router.post('/', checkAuth, favouriteController.create);
router.delete('/:id', checkAuth, favouriteController.remove);

module.exports = router;
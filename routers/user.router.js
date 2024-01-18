const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.get('/profile', userController.list)
router.get('/profile/:userId', userController.show)
router.post('/profile', userController.create)
router.put('/profile/:userId', userController.update)
router.delete('/profile/:userId', userController.remove)

module.exports = router
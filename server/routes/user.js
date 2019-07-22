const router = require('express').Router()
const userController = require ('../controllers/userController')

router.post('/signup', userController.signup)
router.post('/signin',userController.signin)
router.post('/signinGoogle', userController.googleLogin)

module.exports = router
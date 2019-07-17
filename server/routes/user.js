const router = require('express').Router()
const userController = require ('../controllers/userController')

router.post('/', userController.create)
router.get('/',userController.read)
router.put('/:articleId',userController.update)
router.delete('/:articleId',userController.delete)

module.exports = router
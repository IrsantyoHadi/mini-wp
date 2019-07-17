const router = require('express').Router()
const articleController = require ('../controllers/articleController')

router.post('/', articleController.create)
router.get('/',articleController.read)
router.put('/:articleId',articleController.update)
router.delete('/:articleId',articleController.delete)

module.exports = router
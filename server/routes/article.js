const router = require('express').Router()
const articleController = require ('../controllers/articleController')
const images = require('../helpers/gcshelper')

router.post('/upload', images.multer.single('image'), images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

router.post('/', images.multer.single('image'), images.sendUploadToGCS, articleController.create)
router.get('/',articleController.read)
router.put('/:articleId', images.multer.single('image'), images.sendUploadToGCS,articleController.update)
router.delete('/:articleId',articleController.delete)

module.exports = router
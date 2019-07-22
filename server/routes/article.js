const router = require('express').Router()
const articleController = require ('../controllers/articleController')
const images = require('../helpers/gcshelper')
const authent = require('../middlewares/authenticationJWT')
const authroize = require('../middlewares/authorizationJWT')
// router.post('/upload', images.multer.single('image'), images.sendUploadToGCS,
//   (req, res) => {
//     res.send({
//       status: 200,
//       message: 'Your file is successfully uploaded',
//       link: req.file.cloudStoragePublicUrl
//     })
//   })
router.get('/all',articleController.read)
router.post('/', authent, images.multer.single('image'), images.sendUploadToGCS, articleController.create)
router.get('/',authent,articleController.read)
router.put('/:articleId',authent , authroize, images.multer.single('image'), images.sendUploadToGCS,articleController.update)
router.delete('/:articleId',authent,authroize ,articleController.delete)

module.exports = router
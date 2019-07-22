const { articleModel } = require('../models/index')
module.exports = (req, res, next) => {

  articleModel.findById(req.params.articleId)
    .then(dataArticle => {
      if (dataArticle) {
        next()
        if (dataArticle.UserId == req.decoded._id) {
        }
        else {
          throw {
            status: 401,
            message: 'Unauthorized'
          }
        }
      } else {
        throw {
          status: 404,
          message: 'Data not Found'
        }
      }
    })
    .catch(next)
}
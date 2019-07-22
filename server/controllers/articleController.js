const { articleModel } = require("../models")

class ArticleController {
  static create(req, res, next) {
    const { title, content} = req.body
    let imageUrl = null

    if(req.file) {
      imageUrl = req.file.cloudStoragePublicUrl
    }
    articleModel.create({
      title,
      content,
      imageUrl,
      UserId : req.decoded._id
    })
      .then(function (data) {
        res.status(201).json({
          data,
          msg: 'berhasil create'
        })
      })
      .catch(next)
  }

  static read(req, res, next) {
    if(req.query.UserId){
      req.query.title = new RegExp (req.query.title)
      req.query.UserId = req.decoded._id
    }
    articleModel.find(req.query).populate({ path: 'UserId', select: 'username' }).sort([['updatedAt','descending']])
      .then(function (data) {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }

  static update(req, res, next) {
    if(req.file){
      req.body.imageUrl = req.file.cloudStoragePublicUrl
    }
    articleModel.update({ _id: req.params.articleId }, req.body)
      .then(function (data) {
        res.status(200).json({
          data,
          msg: 'berhasil update',
          image : (req.file) ? req.file.cloudStoragePublicUrl : null
        })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    articleModel.deleteOne({ _id: req.params.articleId })
      .then(function (data) {
        res.status(200).json({
          data,
          msg: 'berhasil delete'
        })
      })
      .catch(next)
  }
}

module.exports = ArticleController
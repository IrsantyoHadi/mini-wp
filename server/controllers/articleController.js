const { articleModel } = require("../models")

class ArticleController {
  static create(req, res, next) {
    const { title, content } = req.body
    articleModel.create({
      title,
      content
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
    req.query.title = new RegExp (req.query.title)
    articleModel.find(req.query).sort([['updatedAt','descending']])
      .then(function (data) {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }

  static update(req, res, next) {
    articleModel.update({ _id: req.params.articleId }, req.body)
      .then(function (data) {
        res.status(200).json({
          data,
          msg: 'berhasil update'
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
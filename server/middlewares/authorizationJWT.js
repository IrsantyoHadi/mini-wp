const { todoModel } = require('../models/index')
module.exports = (req, res, next) => {

  todoModel.findById(req.params.id)
    .then(dataTodo => {
      if (dataTodo) {
        if (dataTodo.userId == req.decoded._id) {
          next()
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
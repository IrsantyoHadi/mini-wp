const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'silahkan masukkan judul artikelmu'],

  },
  content: {
    type: String,
    required: [true, 'please insert your content here']
  }
}, { versionKey: false, timestamps: true })


let Article = mongoose.model('article', articleSchema)

module.exports = Article
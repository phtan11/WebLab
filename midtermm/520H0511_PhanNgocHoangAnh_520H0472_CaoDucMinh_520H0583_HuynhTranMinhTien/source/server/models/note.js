const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Untitled',
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Note', noteSchema)

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

const noteRouter = require('./routes/notes')
app.use('/', noteRouter)

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})

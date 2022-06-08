const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const Note = require('../models/note')

const upload = multer({ dest: 'uploads/' })

router.get('/', (req, res) => {
  try {
    Note.find({}, (err, notes) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).json(notes)
      }
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/search', (req, res) => {
  const { q } = req.query
  try {
    Note.find(
      {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { content: { $regex: q, $options: 'i' } },
        ],
      },
      (err, notes) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).json(notes)
        }
      }
    )
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:id', (req, res) => {
  try {
    Note.findById(req.params.id, (err, note) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).json(note)
      }
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/', (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  })
  try {
    note.save((err, note) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(201).json(note)
      }
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put('/:id', (req, res) => {
  try {
    Note.findByIdAndUpdate(req.params.id, req.body, (err, note) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).json(note)
      }
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/:id', (req, res) => {
  try {
    Note.findByIdAndDelete(req.params.id, (err, note) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).json(note)
      }
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router

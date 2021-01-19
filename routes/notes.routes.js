const express = require('express')
const router = express.Router()
const noteController = require('../controllers/note.controller')

router
    .get('/notes',
        noteController.getAllNotes
    )
    .get('/notes/:id',
        noteController.getNoteById
    )

module.exports = router
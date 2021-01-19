const express = require('express')
const router = express.Router()
const noteController = require('../controllers/note.controller')

router
    .post('/notes',
        noteController.createNote)
    .get('/notes',
        noteController.getAllNotes
    )
    .get('/notes/:id',
        noteController.getNoteById
    )
    .put('/notes/:id',
        noteController.updateNote
    )


module.exports = router
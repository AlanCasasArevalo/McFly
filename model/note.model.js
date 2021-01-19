const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        required: true
    }
})

const NoteModel = mongoose.model('Note', NoteSchema)
module.exports = NoteModel
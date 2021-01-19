const NoteModel = require("../model/note.model");

const createNote = async (req, res, next) => {
    const body = req.body
    try {
        const createModel = await NoteModel.create(body)
        res.status(201).json(createModel)
    } catch (error) {
        next(error)
    }
}

const getAllNotes = async (req, res, next) => {
    try {
        const allNotes = await NoteModel.find({})
        res.status(200).json(allNotes)
    } catch (error) {
        next(error)
    }
}

const getNoteById = async (req, res, next) => {
    const id = req.params.id
    const note  = await NoteModel.findById(id)
}

module.exports = {
    createNote,
    getAllNotes,
    getNoteById
}
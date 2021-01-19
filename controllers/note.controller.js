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
}

module.exports = {
    createNote,
    getAllNotes
}
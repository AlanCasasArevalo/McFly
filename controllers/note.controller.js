const NoteModel = require("../model/note.model");

const createNote = async (req, res, next) => {
    const body = req.body
    const createModel = await NoteModel.create(body)
    res.status(201).json(createModel)
}

module.exports = {
    createNote
}
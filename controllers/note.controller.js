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
    try {
        const id = req.params.id
        const note = await NoteModel.findById(id)
        if (note && typeof note !== 'undefined') {
            res.status(200).json(note)
        } else {
            res.status(404).json({
                message: 'Resource was not found'
            })
        }
    } catch (error) {
        next(error)
    }

}

const getAllFavoriteNotes = async (req, res, next) => {
    try {
        const allNotes = await NoteModel.find({favorite: true})
        if (allNotes && typeof allNotes !== 'undefined') {
            res.status(200).json(allNotes)
        } else {
            res.status(404).json({
                message: 'Resource was not found'
            })
        }
    } catch (error) {
        next(error)
    }

}

const updateNote = async (req, res, next) => {

    try {
        const id = req.params.id
        const updateNote = await NoteModel.findByIdAndUpdate(id, req.body, {
            new: true,
            useFindAndModify: false
        })

        if (updateNote && typeof updateNote !== 'undefined') {
            res.status(200).json(updateNote)
        } else {
            res.status(404).json({
                message: 'Resource was not found'
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    getAllFavoriteNotes
}
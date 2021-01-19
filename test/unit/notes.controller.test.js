const newNote = require('../mock-data/new-note.json')
const allNotes = require('../mock-data/all-notes.json')
const allFavoriteNotes = require('../mock-data/all-favorites-notes.json')
const httpsMocks = require('node-mocks-http')

const noteController = require('../../controllers/note.controller')
const NoteModel = require("../../model/note.model");

NoteModel.create = jest.fn()
NoteModel.find = jest.fn()
NoteModel.findById = jest.fn()
NoteModel.findByIdAndUpdate = jest.fn()
NoteModel.findByIdAndDelete = jest.fn()

const noteId = "5f8ad67be5695a197574deb5"

let req, res, next

beforeEach(() => {
    req = httpsMocks.createRequest()
    res = httpsMocks.createResponse()
    next = jest.fn()
})

describe('NoteController', () => {
    describe('Note Controller GET Note', () => {
        it('Should have a getAllNotes function', () => {
            expect(typeof noteController.getAllNotes).toBe('function')
        })

        it('Should call NoteModel.find({})', async () => {
            await noteController.getAllNotes(req, res, next)
            expect(NoteModel.find).toHaveBeenCalledWith({})
        })

        it('Should return response with status 200 and all notes', async () => {
            NoteModel.find.mockReturnValue(allNotes)
            await noteController.getAllNotes(req, res, next)
            expect(res.statusCode).toBe(200)
            expect(res._isEndCalled()).toBeTruthy()
            expect(res._getJSONData()).toStrictEqual(allNotes)
        })

        it('Should handle errors', async function () {
            const errorMessage = {
                message: 'Error Finding'
            }
            const rejectedPromise = Promise.reject(errorMessage)
            NoteModel.find.mockReturnValue(rejectedPromise)
            await noteController.getAllNotes(req, res, next)
            expect(next).toHaveBeenCalledWith(errorMessage)
        });
    })

    describe('Note Controller GET Favorite Note', () => {
        it('Should have a getAllFavoriteNotes function', () => {
            expect(typeof noteController.getAllFavoriteNotes).toBe('function')
        })

        it('Should call NoteModel.find({})', async () => {
            await noteController.getAllFavoriteNotes(req, res, next)
            expect(NoteModel.find).toHaveBeenCalledWith({favorite: true})
        })

        it('Should return response with status 200 and all favorite notes', async () => {
            NoteModel.find.mockReturnValue(allFavoriteNotes)
            await noteController.getAllFavoriteNotes(req, res, next)
            expect(res.statusCode).toBe(200)
            expect(res._isEndCalled()).toBeTruthy()
            expect(res._getJSONData()).toStrictEqual(allFavoriteNotes)
        })

        it('Should handle errors', async function () {
            const errorMessage = {
                message: 'Error Finding'
            }
            const rejectedPromise = Promise.reject(errorMessage)
            NoteModel.find.mockReturnValue(rejectedPromise)
            await noteController.getAllFavoriteNotes(req, res, next)
            expect(next).toHaveBeenCalledWith(errorMessage)
        })

        it('Should return 404 when item does not exist', async () => {
            NoteModel.findByIdAndUpdate.mockReturnValue(null)
            await noteController.getAllFavoriteNotes(req, res, next)
            expect(res.statusCode).toBe(404)
            expect(res._isEndCalled()).toBeTruthy()
            expect(res._getJSONData()).toStrictEqual({
                message: 'Resource was not found'
            })
        })
    })

    describe('Note Controller GET Note BY ID ', () => {
        it('Should have a getNoteById function', () => {
            expect(typeof noteController.getNoteById).toBe('function')
        })

        it('Should call NoteModel.find({id:}) with route parameters', async () => {
            req.params.id = noteId
            await noteController.getNoteById(req, res, next)
            expect(NoteModel.findById).toHaveBeenCalledWith(noteId)
        })

        it('Should return json body and response code 200', async () => {
            NoteModel.findById.mockReturnValue(newNote)
            await noteController.getNoteById(req, res, next)
            expect(res.statusCode).toBe(200)
            expect(res._isEndCalled()).toBeTruthy()
            expect(res._getJSONData()).toStrictEqual(newNote)
        })

        it('Should handle errors', async function () {
            const errorMessage = {
                message: 'Error Finding'
            }
            const rejectedPromise = Promise.reject(errorMessage)
            NoteModel.findById.mockReturnValue(rejectedPromise)
            await noteController.getNoteById(req, res, next)
            expect(next).toHaveBeenCalledWith(errorMessage)
        });

        it('Should return 404 when item does not exist', async () => {
            NoteModel.findById.mockReturnValue(null)
            await noteController.getNoteById(req, res, next)
            expect(res.statusCode).toBe(404)
            expect(res._isEndCalled()).toBeTruthy()
            expect(res._getJSONData()).toStrictEqual({
                message: 'Resource was not found'
            })
        })

    })
    describe('Note Controller POST new note', () => {

        beforeEach(() => {
            req.body = newNote
        })

        it('It NoteController should be defined', () => {
            expect(noteController).toBeDefined()
        })

        it('It should have a createNote Function', () => {
            expect(typeof noteController.createNote).toBe('function')
        })

        it('Note controller should received req, res and next', function () {
            noteController.createNote(req, res, next)
            expect(NoteModel.create).toBeCalledWith(newNote)
        });

        it('Should return 201 response code when everything it is ok', async function () {
            await noteController.createNote(req, res, next)
            expect(res.statusCode).toBe(201)
            expect(res._isEndCalled()).toBeTruthy()
        });

        it('Should return JSON body in response when everything it is ok', async function () {
            NoteModel.create.mockReturnValue(newNote)
            await noteController.createNote(req, res, next)
            expect(res._getJSONData()).toStrictEqual(newNote)
        });

        it('Should handle errors', async function () {
            const errorMessage = {
                message: 'Some properties required was not sent'
            }
            const rejectedPromise = Promise.reject(errorMessage)
            NoteModel.create.mockReturnValue(rejectedPromise)
            await noteController.createNote(req, res, next)
            expect(next).toHaveBeenCalledWith(errorMessage)
        });

    })
    describe('Note Controller PUT new note', () => {
        it('It should have a updateNote Function', () => {
            expect(typeof noteController.updateNote).toBe('function')
        })

        it('Should call NoteModel.findByIdAndUpdate', async () => {
            req.params.id = noteId
            req.body = newNote
            await noteController.updateNote(req, res, next)
            expect(NoteModel.findByIdAndUpdate).toHaveBeenCalledWith(noteId, newNote, {
                new: true,
                useFindAndModify: false
            })
        })

        it('Should return a response with json data and 200', async () => {
            req.params.id = noteId
            req.body = newNote

            NoteModel.findByIdAndUpdate.mockReturnValue(newNote)
            await noteController.updateNote(req, res, next)
            expect(res._isEndCalled()).toBeTruthy()
            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toStrictEqual(newNote)
        })

        it('Should handle errors', async function () {
            const errorMessage = {
                message: 'Resource was not found'
            }
            const rejectedPromise = Promise.reject(errorMessage)
            NoteModel.findByIdAndUpdate.mockReturnValue(rejectedPromise)
            await noteController.updateNote(req, res, next)
            expect(next).toHaveBeenCalledWith(errorMessage)
        })

        it('Should return 404 when item does not exist', async () => {
            NoteModel.findByIdAndUpdate.mockReturnValue(null)
            await noteController.updateNote(req, res, next)
            expect(res.statusCode).toBe(404)
            expect(res._isEndCalled()).toBeTruthy()
            expect(res._getJSONData()).toStrictEqual({
                message: 'Resource was not found'
            })
        })
    })
})

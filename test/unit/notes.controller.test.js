const newNote = require('../mock-data/new-note.json')
const httpsMocks = require('node-mocks-http')

const noteController = require('../../controllers/note.controller')
const NoteModel = require("../../model/note.model");

NoteModel.create = jest.fn()
NoteModel.find = jest.fn()
NoteModel.findById = jest.fn()
NoteModel.findByIdAndUpdate = jest.fn()
NoteModel.findByIdAndDelete = jest.fn()

let req, res, next

beforeEach(() => {
    req = httpsMocks.createRequest()
    res = httpsMocks.createResponse()
    next = jest.fn()
})

describe('NoteController', () => {

    describe('NoteController GET Note', () => {
        it('Should have a getAllNotes function', () => {
            expect(typeof noteController.getAllNotes).toBe('function')
        })

        it('Should call NoteModel.find({})', async () => {
            await noteController.getAllNotes(req, res, next)
            expect(NoteModel.find).toHaveBeenCalledWith({})
        })

    })

    describe('NoteController POST new note', () => {

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
})

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
    })
})

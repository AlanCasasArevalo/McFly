const newNote = require('../mock-data/new-note.json')
const httpsMocks = require('node-mocks-http')

const noteController = require('../../controllers/note.controller')

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

    })
})

const newNote = require('../mock-data/new-note.json')

describe('NoteController', () => {
    describe('NoteController POST new note', () => {

        beforeEach(() => {
            req.body = newNote
        })

        it('It NoteController should be defined', () => {
            expect(noteController).toBeDefined()
        })

    })
})

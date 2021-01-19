const request = require('supertest')
const app = require('../../app')
const endpointUrl = '/notes/'
const newNote = require('../mock-data/new-note.json')

let firsNote, newNoteId

describe(endpointUrl, () => {
    describe('GET NOTE INTEGRATION', () => {
        it(`GET ${endpointUrl}`, async () => {
            const response = await request(app)
                .get(endpointUrl)
            expect(response.statusCode).toBe(200)
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body[0].title).toBeDefined()
            expect(response.body[0].favorite).toBeDefined()
            firsNote = response.body[0]
        })
    })
})
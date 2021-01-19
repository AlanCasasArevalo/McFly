const request = require('supertest')
const app = require('../../app')
const endpointUrl = '/notes/'
const newNote = require('../mock-data/new-note.json')

let firsNote, newNoteId, firsNoteId

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
            firsNoteId = firsNote._id
        })
    })

    describe('GET NOTE BY ID INTEGRATION', () => {
        it(`GET BY ID ${endpointUrl}`, async () => {
            const response = await request(app)
                .get(endpointUrl + firsNote._id)
            expect(response.statusCode).toBe(200)
            expect(response.body).toBeTruthy()
            expect(response.body.title).toEqual(firsNote.title)
            expect(response.body.favorite).toEqual(firsNote.favorite)
        })
        it(`GET BY ID ${endpointUrl} does not exist`, async () => {
            const response = await request(app)
                .get(endpointUrl + `/${firsNoteId}`)
            expect(response.statusCode).toBe(404)
        })
    })

    describe('POST NOTE INTEGRATION', () => {
        it(`POST ${endpointUrl}`, async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send(newNote)
            expect(response.statusCode).toBe(201)
            expect(response.body.title).toBe(newNote.title)
            expect(response.body.favorite).toBe(newNote.favorite)
            newNoteId = response.body._id
        })

        it(`Should return an error 500 on malformed data with POST ${endpointUrl}`, async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send({
                    title: "Make first unit test"
                })
            expect(response.statusCode).toBe(500)
            expect(response.body).toStrictEqual({
                message: 'Note validation failed: favorite: Path `favorite` is required.'
            })
        })
    })

})
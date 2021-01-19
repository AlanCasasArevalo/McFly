const express = require('express')
const app = express()

app.use(express.json())
const noteRoutes = require('./routes/notes.routes')

const mongoDB = require('./mongodb/mongodb.connection')

mongoDB.connect()

app.use('/', noteRoutes)

app.get('/', (req, res) => {
    res.status(200).json({
        response: 'Se ha iniciado el servidor'
    })
})

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message
    })
})

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `We can not find ${req.originalUrl} on this server `
    })
});

module.exports = app






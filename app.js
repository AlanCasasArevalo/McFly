const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        response: 'Se ha iniciado el servidor'
    })
})

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `We can not find ${req.originalUrl} on this server `
    })
});

module.exports = app






const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/notes',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
    } catch (error) {
        console.error('Error al conectarse a la base de datos de mongo', error)
    }
}

module.exports = {
    connect
}
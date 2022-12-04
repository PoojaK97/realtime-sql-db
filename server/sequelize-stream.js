const sequelizeStream = require('sequelize-stream')
const socketConnections = require('./socketConnections')

const {sequelize} = require('./models')
const stream = sequelizeStream(sequelize)

stream.on('data', ({instance, event}) => {
    for (const socket of socketConnections) {
        socket.emit(event, instance.toJSON())
    }
})

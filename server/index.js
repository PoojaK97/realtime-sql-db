const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const db = require('./models')
const pitches = require('./routes/pitches')
const socketConnections = require('./socketConnections')
require('./sequelize-stream')


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use('/pitches', pitches)

// set port, listen for requests
const PORT = process.env.PORT || 8080;

db.sequelize.sync({ force: process.env.FORCE_SYNC ?? false })
  .then(() => {
    io.on('connection', function(socket) {
      socketConnections.add(socket)

      socket.emit('greet', 'connected')

      socket.on('disconnect', function () {
        socketConnections.delete(socket)
      });
   });

   server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

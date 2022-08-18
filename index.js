const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
//New imports
const http = require('http').Server(app);
//Pass the Express app into the HTTP module.
const socketIO = require('socket.io')(http);
app.use(express.static('public'));
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected`);
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
    socket.on('message', (data) => {
        //sends the data to everyone except you.
    socket.broadcast.emit('response', data); 
        //sends the data to everyone connected to the server
    // socket.emit("response", data)
  });
  });
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
//Listen for changes on the HTTP server not the Express server
http.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
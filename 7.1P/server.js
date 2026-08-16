const express = require('express');
const app = express();
const http = require('http').createServer(app); 
const io = require('socket.io')(http);          

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));

let globalCount = 0;

io.on('connection', (socket) => {
  console.log('A user connected. Socket ID:', socket.id);

  socket.emit('updateCount', globalCount);

  socket.on('buttonClicked', () => {

    globalCount++; 
    io.emit('updateCount', globalCount);

  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
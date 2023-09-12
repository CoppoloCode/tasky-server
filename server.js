


const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);

app.use(cors())
const port = 10000;

const socketio = require('socket.io')(server, {cors: {origin: "*"}});

socketio.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.emit('greet', "Hello from server!")

  
  
  socket.on('addUser' , (boardId)=>{
    socket.join(boardId);
  })

  socket.on('sendBoard', (board)=>{
    socket.to(board.id).emit('sendBoard', board)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    
    
  });
  
});

    
server.listen(port, () => {
    console.log(`> Ready on localhost:${port}`);
});

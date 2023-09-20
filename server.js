


const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);
const users = new Set();
app.use(cors())
const port = 10000;

const socketio = require('socket.io')(server, {cors: {origin: "*"}});

socketio.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  if(users.has(socket.id)){
    socket?.disconnect()
   }else{
    users.add(socket.id);
   }
  
  socket.emit('greet', "Hello from server!")

  
  
  socket.on('addUser' , (boardId)=>{
    socket.join(boardId);
  })

  socket.on('sendBoard', (board)=>{
    socket.to(board.id).emit('sendBoard', board)
  })

  socket.on('sendMessage', (message)=>{
    socket.to(message.id).emit('sendMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users.delete(socket.id)
    
  });
  
});

    
server.listen(port, () => {
    console.log(`> Ready on localhost:${port}`);
});

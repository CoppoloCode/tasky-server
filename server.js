
const port = 10000;

const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
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
    console.log(`> Ready on https://tasky-rr1w.onrender.com:${port}`);
});




  

  


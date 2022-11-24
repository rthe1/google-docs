const { Socket } = require('socket.io');

const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  }
})

io.on('connection', (socket) => {
  console.log('connected')
  socket.on('send-changes', (delta) => {
    console.log(delta)
  socket.broadcast.emit("recieve-changes", delta)
  })

  

});
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Game = require('./game');

io.on('connection', socket => {
  const game = new Game(socket);

  socket.on('start', game.start);

  socket.on('choose', game.choose);
});

server.listen(3000);

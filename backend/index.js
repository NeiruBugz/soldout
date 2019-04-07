const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Game = require('./game');

const game = new Game();
io.on('connection', socket => {
  console.log(socket.nsp);
  let tracks = [];
  let rightTrackId;

  const getNextTrackPull = () => {
    const returnObject = { tracks: [] };
    tracks.sort(() => Math.random() - 0.5);

    const randomTrackIndex = Math.floor(Math.random() * 4);
    returnObject.src = tracks[randomTrackIndex].src;
    rightTrackId = tracks[randomTrackIndex].id;
    for (let i = 0; i < 4; i++) {
      const track = tracks.shift();
      returnObject.tracks.push({ id: track.id, name: track.name, artist: track.artist.name });
    }

    return returnObject;
  };

  socket.on('start', async msg => {
    tracks = await game.getTracksByPlaylistId(msg.playlistId);
    tracks = tracks.tracks;

    socket.emit('tracks', getNextTrackPull());
  });

  socket.on('choose', async msg => {
    socket.emit('guess', rightTrackId === msg.trackId);
    socket.emit('tracks', getNextTrackPull());
  });
});

server.listen(3000);

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Game = require('./game');

const game = new Game();
io.on('connection', socket => {
  let tracks = [];
  let rightTrackId;
  let playlistId = null;

  const getNextTrackPull = async () => {
    const returnObject = { tracks: [] };
    if (tracks.length < 4) {
      tracks = await game.getTracksByPlaylistId(playlistId);
      tracks = tracks.tracks;
    }
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
    playlistId = msg.playlistId;
    tracks = await game.getTracksByPlaylistId(playlistId);
    tracks = tracks.tracks;

    socket.emit('tracks', await getNextTrackPull());
  });

  socket.on('choose', async msg => {
    socket.emit('guess', rightTrackId === msg.trackId);
    socket.emit('showCorrect', { choose: msg.trackId, correct: rightTrackId });
    const tracks = await getNextTrackPull();
    setTimeout(() => socket.emit('tracks', tracks), 1500);
  });
});

server.listen(3000);

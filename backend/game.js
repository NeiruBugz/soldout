const Api = require('./api');

module.exports = class Game {
  constructor(socket) {
    this.api = new Api();
    this.socket = socket;
    this.getTracksByPlaylistId = this.api.getPlaylistById;
    this.tracks = [];
    this.rightTrackId = 0;
    this.playlistId = null;

    this.getNextTrackPull = async () => {
      const returnObject = { tracks: [] };
      if (this.tracks.length < 4) {
        this.tracks = await this.getTracksByPlaylistId(this.playlistId);
      }
      this.tracks.sort(() => Math.random() - 0.5);
      const randomTrackIndex = Math.floor(Math.random() * 4);
      const randomTrack = this.tracks[randomTrackIndex];
      returnObject.src = randomTrack.src;
      this.rightTrackId = randomTrack.id;
      for (let i = 0; i < 4; i++) {
        const track = this.tracks.shift();
        const {id, name, artist: {name: artist}} = track;
        returnObject.tracks.push({ id, name, artist });
      }

      return returnObject;
    };

    this.start = async msg => {
      this.playlistId = msg.playlistId;
      this.tracks = await this.getTracksByPlaylistId(this.playlistId);
      this.socket.emit('tracks', await this.getNextTrackPull());
    };

    this.choose = async msg => {
      const { trackId } = msg;
      this.socket.emit('guess', this.rightTrackId === trackId);
      this.socket.emit('showCorrect', { choose: trackId, correct: this.rightTrackId });
      const tracks = await this.getNextTrackPull();
      setTimeout(() => this.socket.emit('tracks', tracks), 1500);
    }
  }
};

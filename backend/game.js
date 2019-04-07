const Api = require('./api');

module.exports = class Game {
  constructor() {
    this.api = new Api();
    this.getTracksByPlaylistId = async playlistId => {
      return await this.api.getPlaylist(playlistId);
    }
  }
}


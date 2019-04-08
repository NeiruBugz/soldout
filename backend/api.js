const axios = require('axios');

module.exports = class Api {
  constructor() {
    this.API_URL = 'https://api.deezer.com';

    this.getPlaylistById = id =>
      axios.get(`${this.API_URL}/playlist/${id}`).then(res => (
        res.data.tracks.data.map(track => ({
          id: track.id,
          name: track.title,
          artist: {
            id: track.artist.id,
            name: track.artist.name,
          },
          src: track.preview,
        }))
      ));
  }
};


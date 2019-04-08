import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  private API_URL = 'https://api.deezer.com';

  public getChart(): Promise<any> {
    return axios.get(`${this.API_URL}/chart`).then(res => ({
      albums: res.data.albums.data.map(album => ({
        id: album.id,
        name: album.name,
        picture: album.picture_big,
      })),
      artists: res.data.artists.data.map(artist => ({
        id: artist.id,
        name: artist.name,
      })),
      playlists: res.data.playlists.data.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
      })),
      tracks: res.data.tracks.data.map(track => ({
        id: track.id,
        name: track.name,
        src: track.preview,
      })),
    }));
  }

  public getPlaylistById(id: number = 5734677122) {
    return axios.get(`${this.API_URL}/playlist/${id}`).then(res =>
      res.data.tracks.data.map(track => ({
        id: track.id,
        name: track.title,
        artist: {
          id: track.artist.id,
          name: track.artist.name,
        },
        src: track.preview,
      })),
    );
  }
}

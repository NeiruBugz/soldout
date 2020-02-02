import { Injectable, HttpService } from '@nestjs/common';
import { DeezerApiPlaylist } from './deezer-api.types';
import { TrackInterface } from '../../interfaces/track.interface';

@Injectable()
export class DeezerApiService {
  constructor(private httpService: HttpService) {}

  public getPlaylistById(id: number): Promise<TrackInterface[]> {
    return this.httpService
      .get<DeezerApiPlaylist>(`/playlist/${id}`)
      .toPromise()
      .then<TrackInterface[]>(res =>
        res.data.tracks.data
          .filter(track => track.preview)
          .map(track => ({
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

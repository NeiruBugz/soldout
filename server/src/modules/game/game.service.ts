import { Injectable } from '@nestjs/common';

import {
  TrackForGameInterface,
  TrackInterface,
} from '../../interfaces/track.interface';

@Injectable()
export class GameService {
  private rightTrackId: number;
  private tracks: TrackInterface[];
  private allTracks: TrackInterface[];

  public init(tracks: TrackInterface[]) {
    this.allTracks = [...tracks];
    this.tracks = tracks.sort(() => Math.random() - 0.5);
  }

  public getNextTrackPull(): {
    src: string;
    tracks: TrackForGameInterface[];
  } {
    // Если осталось меньше 4 треков, то перезагружаем список треков
    if (this.tracks.length < 4) {
      this.tracks = [...this.allTracks];
    }

    const rightTrack: TrackInterface = this.tracks.shift();
    this.rightTrackId = rightTrack.id;

    const wrongTracks: TrackInterface[] = this.allTracks
      .filter(track => track.id !== rightTrack.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return {
      src: rightTrack.src,
      tracks: [rightTrack, ...wrongTracks]
        .sort(() => Math.random() - 0.5)
        .map(({ id, name, artist: { name: artist } }) => ({
          id,
          name,
          artist,
        })),
    };
  }

  public choose(trackId): { choose: number; correct: number } {
    return { choose: trackId, correct: this.rightTrackId };
  }
}

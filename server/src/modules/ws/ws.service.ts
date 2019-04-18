import { Injectable } from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Client } from 'socket.io';

import { ApiService } from '../api/api.service';
import { TrackInterface } from '../tracks/interfaces/track.interface';

@Injectable()
export class WsService {
  private api = new ApiService();
  private playlistId: number;
  private rightTrackId: number;
  private tracks: any;

  private async getNextTrackPull(): Promise<{
    src: string;
    tracks: TrackInterface[];
  }> {
    const returnObject = { tracks: [], src: null };
    if (this.tracks.length < 4) {
      this.tracks = await this.api.getPlaylistById(this.playlistId);
    }
    this.tracks.sort(() => Math.random() - 0.5);
    const randomTrackIndex = Math.floor(Math.random() * 4);
    const randomTrack = this.tracks[randomTrackIndex];
    returnObject.src = randomTrack.src;
    this.rightTrackId = randomTrack.id;
    for (let i = 0; i < 4; i++) {
      const track = this.tracks.shift();
      const {
        id,
        name,
        artist: { name: artist },
      } = track;
      returnObject.tracks.push({ id, name, artist });
    }

    return returnObject;
  }

  public async start(
    data,
  ): Promise<
    WsResponse<{
      src: string;
      tracks: TrackInterface[];
    }>
  > {
    this.playlistId = data.playlistId;
    this.tracks = await this.api.getPlaylistById(this.playlistId);
    return {
      event: 'tracks',
      data: await this.getNextTrackPull(),
    };
  }

  public async choose(client: Client, data): Promise<void> {
    const { trackId } = data;
    setTimeout(() => client.emit('tracks', tracks), 1500);
    client.emit('showCorrect', { choose: trackId, correct: this.rightTrackId });
    client.emit('guess', this.rightTrackId === trackId);
    const tracks = await this.getNextTrackPull();
  }
}

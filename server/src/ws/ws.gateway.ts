import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { ApiService } from '../api/api.service';

@WebSocketGateway()
export class WsGateway {
  @WebSocketServer()
  private server: Server;

  private api = new ApiService();
  private playlistId: number;
  private rightTrackId: number;
  private tracks: any;

  private async getNextTrackPull() {
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

  @SubscribeMessage('start')
  async start(client: Client, data: any): Promise<WsResponse<object>> {
    this.playlistId = data.playlistId;
    this.tracks = await this.api.getPlaylistById(this.playlistId);
    return {
      event: 'tracks',
      data: await this.getNextTrackPull(),
    };
  }

  @SubscribeMessage('choose')
  async choose(
    client: Client,
    data: any,
  ): Promise<Array<WsResponse<boolean | object>>> {
    const { trackId } = data;
    setTimeout(() => client.emit('tracks', tracks), 1500);
    const tracks = await this.getNextTrackPull();
    return [
      {
        event: 'guess',
        data: this.rightTrackId === trackId,
      },
      {
        event: 'showCorrect',
        data: { choose: trackId, correct: this.rightTrackId },
      },
    ];
  }
}

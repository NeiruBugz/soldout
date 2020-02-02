import { Injectable } from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { DeezerApiService } from '../deezer-api/deezer-api.service';
import { GameService } from '../game';
import { TrackForGameInterface } from '../../interfaces/track.interface';

@Injectable()
export class WsService {
  constructor(private readonly deezerApiService: DeezerApiService) {}

  private clients: Record<string, GameService> = {};

  public addClient(clientId: string): void {
    this.clients[clientId] = new GameService();
  }

  public removeClient(clientId: string): void {
    delete this.clients[clientId];
  }

  public async start(
    clientId: string,
    playlistId: number,
  ): Promise<WsResponse<{ src: string; tracks: TrackForGameInterface[] }>> {
    const tracks = await this.deezerApiService.getPlaylistById(playlistId);
    this.clients[clientId].init(tracks);
    return this.getNextTracks(clientId);
  }

  public getNextTracks(
    clientId,
  ): WsResponse<{ src: string; tracks: TrackForGameInterface[] }> {
    return {
      event: 'tracks',
      data: this.clients[clientId].getNextTrackPull(),
    };
  }

  public choose(client: Socket, trackId: number): void {
    const { choose, correct } = this.clients[client.id].choose(trackId);
    client.emit('showCorrect', { choose, correct });
    client.emit('guess', choose === correct);

    const newTracks = this.clients[client.id].getNextTrackPull();
    setTimeout(() => client.emit('tracks', newTracks), 1500);
  }
}

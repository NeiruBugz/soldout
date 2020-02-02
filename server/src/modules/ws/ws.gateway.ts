import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsService } from './ws.service';
import { TrackForGameInterface } from '../../interfaces/track.interface';

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly wsService: WsService) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('start')
  public async start(
    client: Socket,
    { playlistId },
  ): Promise<WsResponse<{ src: string; tracks: TrackForGameInterface[] }>> {
    return this.wsService.start(client.id, playlistId);
  }

  @SubscribeMessage('choose')
  public choose(client: Socket, data: { trackId: number }): void {
    return this.wsService.choose(client, data.trackId);
  }

  public handleConnection(client: Socket) {
    this.wsService.addClient(client.id);
  }

  public handleDisconnect(client: Socket) {
    this.wsService.removeClient(client.id);
  }
}

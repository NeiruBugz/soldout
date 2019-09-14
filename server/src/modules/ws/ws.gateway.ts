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

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  private clients: Record<string, WsService> = {};

  @SubscribeMessage('start')
  public start(client: Socket, data: any): Promise<WsResponse<object>> {
    return this.clients[client.id].start(data);
  }

  @SubscribeMessage('choose')
  public choose(client: Socket, data: any): void {
    this.clients[client.id].choose(client, data);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.clients[client.id] = new WsService();
  }

  public handleDisconnect(client: Socket) {
    delete this.clients[client.id];
  }
}

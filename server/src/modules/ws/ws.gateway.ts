import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { WsService } from './ws.service';

@WebSocketGateway()
export class WsGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly wsService: WsService) {}

  @SubscribeMessage('start')
  public start(client: Client, data: any): Promise<WsResponse<object>> {
    return this.wsService.start(data);
  }

  @SubscribeMessage('choose')
  public choose(client: Client, data: any): void {
    this.wsService.choose(client, data);
  }
}

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';

@WebSocketGateway()
export class WsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  test(client: Client, data: any): WsResponse<object[]> {
    client.send({
      event: 'tracks',
      data: [],
    });
    console.log(client, data);
    return {
      event: 'tracks',
      data: [],
    };
  }
}

import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { WsService } from './ws.service';
import { DeezerApiModule } from '../deezer-api';

@Module({
  imports: [DeezerApiModule],
  providers: [WsGateway, WsService],
})
export class WsModule {}

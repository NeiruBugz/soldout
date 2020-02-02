import { Module } from '@nestjs/common';
import {
  DeezerApiModule,
  GameModule,
  HealthModule,
  PlaylistsModule,
  WsModule,
  MongooseRootAsync,
} from './modules';

@Module({
  imports: [
    DeezerApiModule,
    GameModule,
    HealthModule,
    PlaylistsModule,
    MongooseRootAsync,
    WsModule,
  ],
})
export class AppModule {}

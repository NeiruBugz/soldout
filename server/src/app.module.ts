import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { WsModule } from './modules/ws/ws.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';

@Module({
  imports: [ApiModule, WsModule, PlaylistsModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { WsModule } from './modules/ws/ws.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ApiModule, WsModule, PlaylistsModule, HealthModule],
})
export class AppModule {}

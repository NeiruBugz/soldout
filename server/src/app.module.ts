import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './modules/api/api.module';
import { WsModule } from './modules/ws/ws.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';

@Module({
  imports: [ApiModule, WsModule, PlaylistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

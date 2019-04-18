import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { playlistsProviders } from './playlists.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, ...playlistsProviders],
})
export class PlaylistsModule {}

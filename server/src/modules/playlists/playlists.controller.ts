import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { Playlist } from './interfaces/playlist.interface';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { DeniedGuard } from '../../guards/denied.guard';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  @UseGuards(DeniedGuard)
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return await this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  async findAll(): Promise<Playlist[]> {
    return this.playlistsService.findAll();
  }

  @Delete(':id')
  @UseGuards(DeniedGuard)
  async remove(@Param() playlistId: number) {
    return this.playlistsService.delete(playlistId);
  }
}

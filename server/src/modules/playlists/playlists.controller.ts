import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { Playlist } from '../../interfaces/playlist.interface';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { AdminGuard } from '../../guards/admin-guard.service';
import { Types } from 'mongoose';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return await this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  async findAll(): Promise<Playlist[]> {
    return this.playlistsService.findAll();
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param() playlistId: Types.ObjectId) {
    return this.playlistsService.delete(playlistId);
  }
}

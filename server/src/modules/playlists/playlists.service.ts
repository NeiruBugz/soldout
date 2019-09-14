import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Playlist } from './interfaces/playlist.interface';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @Inject('PLAYLIST_MODEL') private readonly playlistModel: Model<Playlist>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const createdPlaylist = new this.playlistModel(createPlaylistDto);
    return createdPlaylist.save();
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistModel.find().exec();
  }

  async delete(playlistId: number): Promise<Playlist[]> {
    return this.playlistModel.deleteOne({id: playlistId});
  }
}

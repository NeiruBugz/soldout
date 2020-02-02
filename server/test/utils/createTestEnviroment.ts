import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { PlaylistsService } from '../../src/modules/playlists/playlists.service';
import { CreatePlaylistDto } from '../../src/modules/playlists/dto/create-playlist.dto';
import { TrackInterface } from '../../src/interfaces/track.interface';
import { DeezerApiModule } from '../../src/modules/deezer-api';
import { WsModule } from '../../src/modules/ws';
import { PlaylistsModule } from '../../src/modules/playlists';
import { HealthModule } from '../../src/modules/health';
import { MongooseRootAsync } from '../../src/modules/database';

export class TestEnvironment {
  public testingModule: TestingModule;

  public CREATE_PLAYLIST_DTO_MOCK: CreatePlaylistDto = {
    playlistId: 6536346784,
    name: 'Русский Рэп',
  };

  public TRACK_MOCK: TrackInterface = {
    id: 100,
    artist: {
      id: 10,
      name: 'Гуф',
    },
    name: 'Трамвайные пути',
    src: 'http://example.com/sound.mp3',
  };

  public async init() {
    this.testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    return this;
  }

  public async createMockPlaylist(props?: Partial<CreatePlaylistDto>) {
    return this.testingModule
      .get(PlaylistsService)
      .create(this.getMockPlaylist(props));
  }

  public getMockPlaylist(props: Partial<CreatePlaylistDto>): CreatePlaylistDto {
    return { ...this.CREATE_PLAYLIST_DTO_MOCK, ...props };
  }

  public getMockTrack(props: Partial<TrackInterface>): TrackInterface {
    return { ...this.TRACK_MOCK, ...props };
  }
}

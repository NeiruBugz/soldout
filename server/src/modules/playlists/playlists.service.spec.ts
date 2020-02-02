import { TestEnvironment } from '../../../test/utils/createTestEnviroment';
import { PlaylistsService } from './playlists.service';

describe('PlaylistsService', () => {
  let module: TestEnvironment;
  let service: PlaylistsService;

  beforeEach(async () => {
    module = await new TestEnvironment().init();
    service = module.testingModule.get<PlaylistsService>(PlaylistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create playlist', async () => {
    expect(await service.create(module.CREATE_PLAYLIST_DTO_MOCK)).toMatchObject(
      {
        ...module.CREATE_PLAYLIST_DTO_MOCK,
      },
    );
  });

  it('should get playlists', async () => {
    const rapPL = {
      playlistId: 100,
      name: 'Рэп',
    };
    const rockPL = {
      playlistId: 100,
      name: 'Рок',
    };
    const popPL = {
      playlistId: 100,
      name: 'Поп',
    };

    await module.createMockPlaylist(rapPL);
    await module.createMockPlaylist(rockPL);
    await module.createMockPlaylist(popPL);

    expect(await service.findAll()).toHaveLength(3);
    expect(await service.findAll()).toMatchObject([rapPL, rockPL, popPL]);
  });

  it('should delete playlists', async () => {
    const rapPL = {
      playlistId: 100,
      name: 'Рэп',
    };
    const createdPL = await module.createMockPlaylist(rapPL);

    expect(await service.findAll()).toHaveLength(1);
    expect(await service.delete(createdPL._id)).toMatchObject(rapPL);
    expect(await service.findAll()).toHaveLength(0);
  });
});

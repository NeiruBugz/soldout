import { TestEnvironment } from '../../../test/utils/createTestEnviroment';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';

describe('PlaylistsController', () => {
  let module: TestEnvironment;
  let service: PlaylistsService;
  let controller: PlaylistsController;

  beforeEach(async () => {
    module = await new TestEnvironment().init();
    controller = module.testingModule.get<PlaylistsController>(
      PlaylistsController,
    );
    service = module.testingModule.get<PlaylistsService>(PlaylistsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create playlist', async () => {
    const playlist = module.createMockPlaylist();
    const spy = jest
      .spyOn(service, 'create')
      .mockImplementation(() => playlist);
    expect(
      await controller.create(module.CREATE_PLAYLIST_DTO_MOCK),
    ).toMatchObject(playlist);
    expect(spy).toHaveBeenCalledWith(module.CREATE_PLAYLIST_DTO_MOCK);
  });

  it('should get playlists', async () => {
    await module.createMockPlaylist();
    await module.createMockPlaylist();
    await module.createMockPlaylist();

    const spy = jest.spyOn(service, 'findAll');
    expect(await controller.findAll()).toHaveLength(3);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should delete playlist', async () => {
    const playlist = await module.createMockPlaylist();

    const spy = jest.spyOn(service, 'delete');
    expect(await controller.findAll()).toHaveLength(1);

    await controller.remove(playlist._id);

    expect(await controller.findAll()).toHaveLength(0);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(playlist._id);
  });
});

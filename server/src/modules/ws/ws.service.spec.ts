import { Socket } from 'socket.io';
import { TestEnvironment } from '../../../test/utils/createTestEnviroment';
import { WsService } from './ws.service';
import { GameService } from '../game';
import { DeezerApiService } from '../deezer-api/deezer-api.service';
import { TrackInterface } from '../../interfaces/track.interface';

describe('WsService', () => {
  let module: TestEnvironment;
  let service: WsService;
  let gameService: GameService;
  let deezerService: DeezerApiService;
  let tracks: TrackInterface[];

  // @ts-ignore
  const MOCK_CLIENT: Socket = {
    id: 'someId',
    emit: jest.fn(),
  } as Socket;

  beforeEach(async () => {
    module = await new TestEnvironment().init();
    service = module.testingModule.get<WsService>(WsService);
    gameService = module.testingModule.get<GameService>(GameService);
    deezerService = module.testingModule.get<DeezerApiService>(
      DeezerApiService,
    );

    tracks = [
      module.getMockTrack({
        id: 1000,
        name: 'track1',
        src: 'http://site.com/track1.mp3',
      }),
      module.getMockTrack({
        id: 2000,
        name: 'track2',
        src: 'http://site.com/track2.mp3',
      }),
      module.getMockTrack({
        id: 3000,
        name: 'track3',
        src: 'http://site.com/track3.mp3',
      }),
      module.getMockTrack({
        id: 4000,
        name: 'track4',
        src: 'http://site.com/track4.mp3',
      }),
      module.getMockTrack({
        id: 5000,
        name: 'track5',
        src: 'http://site.com/track5.mp3',
      }),
      module.getMockTrack({
        id: 6000,
        name: 'track6',
        src: 'http://site.com/track6.mp3',
      }),
      module.getMockTrack({
        id: 7000,
        name: 'track7',
        src: 'http://site.com/track7.mp3',
      }),
      module.getMockTrack({
        id: 8000,
        name: 'track8',
        src: 'http://site.com/track8.mp3',
      }),
      module.getMockTrack({
        id: 9000,
        name: 'track9',
        src: 'http://site.com/track9.mp3',
      }),
      module.getMockTrack({
        id: 10000,
        name: 'track10',
        src: 'http://site.com/track10.mp3',
      }),
      module.getMockTrack({
        id: 11000,
        name: 'track11',
        src: 'http://site.com/track11.mp3',
      }),
      module.getMockTrack({
        id: 12000,
        name: 'track12',
        src: 'http://site.com/track12.mp3',
      }),
      module.getMockTrack({
        id: 13000,
        name: 'track13',
        src: 'http://site.com/track13.mp3',
      }),
      module.getMockTrack({
        id: 14000,
        name: 'track14',
        src: 'http://site.com/track14.mp3',
      }),
      module.getMockTrack({
        id: 15000,
        name: 'track15',
        src: 'http://site.com/track15.mp3',
      }),
      module.getMockTrack({
        id: 16000,
        name: 'track16',
        src: 'http://site.com/track16.mp3',
      }),
      module.getMockTrack({
        id: 17000,
        name: 'track17',
        src: 'http://site.com/track17.mp3',
      }),
      module.getMockTrack({
        id: 18000,
        name: 'track18',
        src: 'http://site.com/track18.mp3',
      }),
      module.getMockTrack({
        id: 19000,
        name: 'track19',
        src: 'http://site.com/track19.mp3',
      }),
      module.getMockTrack({
        id: 20000,
        name: 'track20',
        src: 'http://site.com/track20.mp3',
      }),
    ];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add client', () => {
    service.addClient(MOCK_CLIENT.id);
    // tslint:disable-next-line:no-string-literal
    expect(Object.keys(service['clients'])).toMatchObject([MOCK_CLIENT.id]);
  });

  it('should remove client', () => {
    service.addClient('100');
    service.addClient('200');
    service.addClient('300');
    // tslint:disable-next-line:no-string-literal
    expect(Object.keys(service['clients'])).toHaveLength(3);

    service.removeClient('100');
    service.removeClient('300');

    // tslint:disable-next-line:no-string-literal
    expect(Object.keys(service['clients'])).toHaveLength(1);
    // tslint:disable-next-line:no-string-literal
    expect(Object.keys(service['clients'])).toMatchObject(['200']);
  });

  it('should start & getNextTracks', async () => {
    service.addClient(MOCK_CLIENT.id);
    jest
      .spyOn(deezerService, 'getPlaylistById')
      .mockImplementation(async () => tracks);

    const response = await service.start(MOCK_CLIENT.id, 999);
    expect(response.event).toBe('tracks');
    expect(response.data.src).toMatch(
      /http:\/\/site\.com\/track[0-9]{1,2}\.mp3/,
    );
    expect(response.data.tracks).toHaveLength(4);
  });

  it('should choose', async () => {
    service.addClient(MOCK_CLIENT.id);
    jest
      .spyOn(deezerService, 'getPlaylistById')
      .mockImplementation(async () => tracks);

    const response = await service.start(MOCK_CLIENT.id, 999);
    const ids = response.data.tracks.map(track => track.id);
    jest.useFakeTimers();

    service.choose(MOCK_CLIENT, ids[2]);

    expect(MOCK_CLIENT.emit).toHaveBeenCalledTimes(2);
    expect(jest.getTimerCount()).toBe(1);

    jest.runAllTimers();
    expect(MOCK_CLIENT.emit).toHaveBeenCalledTimes(3);
  });
});

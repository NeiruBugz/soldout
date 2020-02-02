import { TestEnvironment } from '../../../test/utils/createTestEnviroment';
import { GameService } from './game.service';
import { TrackInterface } from '../../interfaces/track.interface';

describe('GameService', () => {
  let module: TestEnvironment;
  let service: GameService;
  let tracks: TrackInterface[];

  beforeEach(async () => {
    module = await new TestEnvironment().init();
    service = module.testingModule.get<GameService>(GameService);

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

  it('should init', async () => {
    service.init(tracks);

    tracks.forEach(track => {
      // tslint:disable-next-line:no-string-literal
      expect(service['allTracks']).toContain(track);
      // tslint:disable-next-line:no-string-literal
      expect(service['tracks']).toContain(track);
    });
  });

  it('should getNextTrackPull', async () => {
    service.init(tracks);
    const nextTracks = service.getNextTrackPull();
    expect(nextTracks.src).toMatch(/http:\/\/site\.com\/track[0-9]{1,2}\.mp3/);
    expect(nextTracks.tracks).toHaveLength(4);
  });

  it('should choose', async () => {
    service.init(tracks);
    service.getNextTrackPull();

    // tslint:disable-next-line:no-string-literal
    const rightTrack = service['rightTrackId'];
    expect(rightTrack).toBeDefined();
    const chooseResult = service.choose(999);
    expect(chooseResult).toMatchObject({ choose: 999, correct: rightTrack });
  });
});

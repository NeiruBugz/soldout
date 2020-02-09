import { Socket } from 'socket.io';
import { TestEnvironment } from '../../../test/utils/createTestEnviroment';
import { WsGateway } from './ws.gateway';
import { WsService } from './ws.service';
import { GameService } from '../game';

describe('WsGateway', () => {
  let module: TestEnvironment;
  let gateway: WsGateway;
  let service: WsService;
  let gameService: GameService;

  // @ts-ignore
  const MOCK_CLIENT: Socket = {
    id: 'someId',
    emit: jest.fn(),
  } as Socket;

  beforeEach(async () => {
    module = await new TestEnvironment().init();
    gateway = module.testingModule.get<WsGateway>(WsGateway);
    service = module.testingModule.get<WsService>(WsService);
    gameService = module.testingModule.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should start', async () => {
    const wsServiceAddClientSpy = jest.spyOn(service, 'addClient');
    const wsServiceStartSpy = jest.spyOn(service, 'start');
    gateway.handleConnection(MOCK_CLIENT);
    await gateway.start(MOCK_CLIENT, { playlistId: 123 });
    expect(wsServiceAddClientSpy).toHaveBeenCalledTimes(1);
    expect(wsServiceAddClientSpy).toHaveBeenCalledWith(MOCK_CLIENT.id);

    expect(wsServiceStartSpy).toHaveBeenCalledTimes(1);
    expect(wsServiceStartSpy).toHaveBeenCalledWith(MOCK_CLIENT.id, 123);
  });

  it('should choose', async () => {
    gateway.handleConnection(MOCK_CLIENT);
    const wsServiceChooseSpy = jest
      .spyOn(service, 'choose')
      .mockImplementation();
    gateway.choose(MOCK_CLIENT, { trackId: 1337 });

    expect(wsServiceChooseSpy).toHaveBeenCalledTimes(1);
    expect(wsServiceChooseSpy).toHaveBeenCalledWith(MOCK_CLIENT, 1337);
  });

  it('should disconnect', async () => {
    gateway.handleConnection(MOCK_CLIENT);
    const wsServiceRemoveClientSpy = jest.spyOn(service, 'removeClient');
    gateway.handleDisconnect(MOCK_CLIENT);

    expect(wsServiceRemoveClientSpy).toHaveBeenCalledTimes(1);
    expect(wsServiceRemoveClientSpy).toHaveBeenCalledWith(MOCK_CLIENT.id);
  });
});

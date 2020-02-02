import { TestEnvironment } from '../../test/utils/createTestEnviroment';
import { ConfigService } from '../modules';
import { AdminGuard } from './admin-guard.service';

describe('AdminGuard', () => {
  let module: TestEnvironment;
  let guard: AdminGuard;
  let config: ConfigService;

  beforeAll(async () => {
    module = await new TestEnvironment().init();
    guard = module.testingModule.get<AdminGuard>(AdminGuard);
    config = module.testingModule.get<ConfigService>(ConfigService);
  });

  it('Should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('Should allow access', () => {
    const mockContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({
          query: {
            secret: config.get('ADMIN_SECRET'),
          },
        })),
      })),
    };

    // @ts-ignore
    expect(guard.canActivate(mockContext)).toBeTruthy();
  });

  it('Should deny access', () => {
    const mockContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({
          query: {
            secret: 'wrongSecret',
          },
        })),
      })),
    };

    // @ts-ignore
    expect(guard.canActivate(mockContext)).toBeFalsy();
  });
});

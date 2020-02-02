import { HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '../config';

export const DeezerHttpModule = HttpModule.registerAsync({
  imports: [ConfigModule],
  useFactory: () => ({
    timeout: 5000,
    maxRedirects: 5,
    baseURL: 'https://api.deezer.com',
  }),
});

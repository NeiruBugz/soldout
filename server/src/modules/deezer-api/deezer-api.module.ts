import { Module } from '@nestjs/common';
import { DeezerApiController } from './deezer-api.controller';
import { DeezerApiService } from './deezer-api.service';
import { DeezerHttpModule } from './deezer-api.http.module';

@Module({
  imports: [DeezerHttpModule],
  controllers: [DeezerApiController],
  providers: [DeezerApiService],
  exports: [DeezerApiService],
})
export class DeezerApiModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [ApiModule, WsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

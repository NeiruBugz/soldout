import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
// import * as cors from 'cors';
//
// const corsOptions = {
//   origin: 'http://nestjs.test',
//   credentials: true,
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

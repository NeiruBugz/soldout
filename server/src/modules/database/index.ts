import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ConfigModule, ConfigService } from '../config';
import { PlaylistSchema } from '../../schemas/playlist.schema';

export const MongooseRootAsync = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri:
      configService.get('NODE_ENV') === 'test'
        ? await new MongoMemoryServer().getUri()
        : configService.get('MONGO_URL'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }),
  inject: [ConfigService],
});

export const MongoosePlaylist = MongooseModule.forFeature([
  { name: 'Playlist', schema: PlaylistSchema },
]);

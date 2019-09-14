import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TerminusModule,
  MongooseHealthIndicator,
  TerminusModuleOptions,
  DNSHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

const getTerminusOptions = (
  mongoose: MongooseHealthIndicator,
  dns: DNSHealthIndicator,
  memory: MemoryHealthIndicator,
  disk: DiskHealthIndicator,
): TerminusModuleOptions => ({
  endpoints: [
    {
      url: '/health',
      healthIndicators: [
        async () => dns.pingCheck('dnsCheck', 'https://google.com'),
        async () => memory.checkHeap('heapCheck', 300 * 1024 * 1024),
        async () => memory.checkRSS('rssCheck', 300 * 1024 * 1024),
        async () =>
          disk.checkStorage('diskCheck', {
            path: '/',
            thresholdPercent: 30,
          }),
        async () => await mongoose.pingCheck('mongoCheck'),
      ],
    },
  ],
});

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb/music10'),
    TerminusModule.forRootAsync({
      inject: [
        MongooseHealthIndicator,
        DNSHealthIndicator,
        MemoryHealthIndicator,
        DiskHealthIndicator,
      ],
      useFactory: getTerminusOptions,
    }),
  ],
})
export class HealthModule {}

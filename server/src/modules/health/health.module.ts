import { Module } from '@nestjs/common';
import {
  DiskHealthIndicator,
  DNSHealthIndicator,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';
import { getTerminusOptions } from './health.utils';

@Module({
  imports: [
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

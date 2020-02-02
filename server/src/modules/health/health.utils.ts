import {
  DiskHealthIndicator,
  DNSHealthIndicator,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
  TerminusModuleOptions,
} from '@nestjs/terminus';

export const getTerminusOptions = (
  mongoose: MongooseHealthIndicator,
  dns: DNSHealthIndicator,
  memory: MemoryHealthIndicator,
  disk: DiskHealthIndicator,
): TerminusModuleOptions => ({
  endpoints: [
    {
      url: '/deezer-api/health',
      healthIndicators: [
        async () => dns.pingCheck('dnsCheck', 'https://music10.ru'),
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

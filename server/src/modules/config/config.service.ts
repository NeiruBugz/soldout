import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: Record<string, string> = {};

  constructor() {
    const envFileName = `${process.env.NODE_ENV || 'development'}.env`;
    if (fs.existsSync(envFileName)) {
      this.envConfig = dotenv.parse(fs.readFileSync(envFileName));
    }
  }

  get(key: string): string {
    return process.env[key] || this.envConfig[key];
  }
}

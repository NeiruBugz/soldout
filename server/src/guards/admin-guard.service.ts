import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '../modules';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const {
      query: { secret },
    } = context.switchToHttp().getRequest();

    return secret === this.configService.get('ADMIN_SECRET');
  }
}

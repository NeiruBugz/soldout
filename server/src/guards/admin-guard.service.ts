import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const {
      query: { secret },
    } = context.switchToHttp().getRequest();

    return secret === 'GeekWard1306';
  }
}

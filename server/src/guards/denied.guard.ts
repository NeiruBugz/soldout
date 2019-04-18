import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class DeniedGuard implements CanActivate {
  canActivate(): boolean | Promise<boolean> {
    return false;
  }
}

import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ERoleNames } from 'src/interfaces/ERoleNames';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ERoleNames[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const payload = context.switchToHttp().getRequest().user

    if (!payload) {
      throw new UnauthorizedException('Користувач не авторизований')
    }

    if (!requiredRoles.includes(payload.role)) {
      throw new ForbiddenException('Недостатньо прав для доступу до цього ресурсу')
    }

    return true;
  }
}

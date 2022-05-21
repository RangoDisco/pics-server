import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { ROLES_KEY } from './roles.decorator';
import { ERole } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    if (!gqlContext.req.headers.authorization) {
      return false;
    }

    const token = gqlContext.req.headers.authorization.split(' ')[1];

    const decodedToken = this.authService.decodeToken(token);

    const user = await this.usersService.findOne(decodedToken.username);

    return user.role === ERole.Admin || requiredRoles.includes(user.role);
  }
}

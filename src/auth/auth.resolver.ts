import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver, Context } from '@nestjs/graphql';
import Ctx from 'src/types/context.type';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';
import { LoginReponse } from './dto/login-response';
import { RolesGuard } from './roles/roles-auth.guard';
import { Roles } from './roles/roles.decorator';
import { ERole } from './roles/roles.enum';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginReponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @UseGuards(RolesGuard)
  @Roles(ERole.Admin)
  @Mutation(() => User)
  register(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.register(loginInput);
  }

  @Query(() => User)
  async getSignedInUser(@Context() ctx: Ctx): Promise<User> {
    return await this.authService.getSignedInUser(ctx.req);
  }
}

import { Args, Query, Mutation, Resolver, Context } from '@nestjs/graphql';
import Ctx from 'src/types/context.type';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';
import { LoginReponse } from './dto/login-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginReponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => User)
  register(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.register(loginInput);
  }

  @Query(() => User)
  async getSignedInUser(@Context() ctx: Ctx): Promise<User> {
    return await this.authService.getSignedInUser(ctx.req);
  }
}

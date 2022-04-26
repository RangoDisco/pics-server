import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { generateToken } from 'src/helpers/token';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => String, { nullable: true })
  async signIn(@Args('createUserInput') createUserInput: CreateUserInput) {
    const userToSignIn = await this.usersService.findOne(
      createUserInput.username,
    );
    if (userToSignIn) {
      if (userToSignIn.password === createUserInput.password) {
        const token = generateToken(userToSignIn.id);
        return token && token;
      }
    }
    return null;
  }
}

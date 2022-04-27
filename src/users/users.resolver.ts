import { Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  picturesService: any;
  constructor(private readonly usersService: UsersService) {}
}

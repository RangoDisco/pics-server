import { User } from 'src/users/entities/user.entity';

type Ctx = {
  req: Request & { user?: Pick<User, 'username'> };
  res: Response;
};

export default Ctx;

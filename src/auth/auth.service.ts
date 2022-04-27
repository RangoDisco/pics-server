import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/login-input';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username);

    if (user && (await argon2.verify(user?.password, password))) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginInput: LoginInput) {
    const user = await this.usersService.findOne(loginInput.username);
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }

  async register(loginInput: LoginInput): Promise<User | null> {
    const hashedPassword = await argon2.hash(loginInput.password);
    loginInput.password = hashedPassword;
    const res = await this.usersService.create(loginInput);
    return res;
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }

  async getSignedInUser(req: any): Promise<User> {
    const username = this.decodeToken(
      req.headers.authorization.split(' ')[1],
    ).username;
    return await this.usersService.findOne(username);
  }
}

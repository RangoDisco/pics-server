import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { UsersService } from 'src/users/users.service';

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      loggin: true,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return false;
    return { userId: payload.sub, username: payload.username };
  }
}

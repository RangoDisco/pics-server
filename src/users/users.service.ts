import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { ERole } from '../auth/roles/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User | null> {
    const newUser = this.userRepository.create(createUserInput);
    newUser.isActive = true;
    newUser.creationDate = new Date();
    newUser.role = ERole.User;
    await this.userRepository.save(newUser);
    return newUser;
  }

  createToken({ username }): string {
    return jwt.sign({ username }, 'secretKey');
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(username?: string, id?: number) {
    return await this.userRepository.findOneBy({ username, id });
  }
}

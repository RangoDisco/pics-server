import { forwardRef, Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesResolver } from './pictures.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entities/picture.entity';
import { Collection } from 'src/collections/entities/collection.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Picture, Collection, User]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
  providers: [PicturesResolver, PicturesService, UsersService],
})
export class PicturesModule {}

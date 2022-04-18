import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesResolver } from './pictures.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entities/picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  providers: [PicturesResolver, PicturesService],
})
export class PicturesModule {}

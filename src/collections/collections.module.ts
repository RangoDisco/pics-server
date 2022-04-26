import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsResolver } from './collections.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { Picture } from 'src/pictures/entities/picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, Picture])],
  providers: [CollectionsResolver, CollectionsService],
})
export class CollectionsModule {}

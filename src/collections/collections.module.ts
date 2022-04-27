import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsResolver } from './collections.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/entities/category.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection, Picture, Category]),
    CategoriesModule,
    UsersModule,
    AuthModule,
    TagsModule,
  ],
  providers: [CollectionsResolver, CollectionsService],
})
export class CollectionsModule {}

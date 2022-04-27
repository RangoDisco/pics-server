import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PicturesModule } from './pictures/pictures.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collections.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { UsersService } from './users/users.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles/roles-auth.guard';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'pictest',
      synchronize: true,
      logging: true,
    }),
    PicturesModule,
    UsersModule,
    CollectionsModule,
    CategoriesModule,
    TagsModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: false,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  constructor(private connetion: Connection) {}
}

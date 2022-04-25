import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Collection } from 'src/collections/entities/collection.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: "Category's description" })
  id: number;

  @Column()
  @Field(() => String, { description: "Category's title" })
  title: string;

  @OneToMany(() => Collection, (Collection) => Collection.category)
  collections: Collection[];
}

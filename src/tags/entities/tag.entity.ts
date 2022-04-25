import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Collection } from 'src/collections/entities/collection.entity';
import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: "Tag's description" })
  id: number;

  @Column()
  @Field(() => String, { description: "Tag's title" })
  title: string;

  @Column()
  @ManyToMany(() => Collection, (Collection) => Collection.tags)
  collections: Collection[];
}

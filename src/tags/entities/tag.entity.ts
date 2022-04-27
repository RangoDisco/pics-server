import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Collection } from 'src/collections/entities/collection.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: "Tag's description" })
  id: number;

  @Column()
  @Field(() => String, { description: "Tag's title" })
  title: string;

  @ManyToMany(() => Collection, (Collection) => Collection.tags, { lazy: true })
  @Field(() => [Collection])
  collections: Promise<Collection[]>;
}

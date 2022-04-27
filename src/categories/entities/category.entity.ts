import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Collection } from 'src/collections/entities/collection.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: "Category's description" })
  id: number;

  @Column()
  @Field(() => String, { description: "Category's title" })
  title: string;

  @OneToMany(() => Collection, (Collection) => Collection.category)
  @Field(() => [Collection])
  collections: Collection[];
}

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Collection } from 'src/collections/entities/collection.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field(() => String, { description: "Picture's title" })
  title: string;

  @Column()
  @Field(() => String, { description: "Picture's URL" })
  contentUrl: string;

  @Column()
  @Field(() => String, { description: "Picture's location" })
  location: string;

  @Column()
  @Field(() => Date, { description: 'Date when the picture was taken' })
  date: Date;

  @ManyToOne(() => User, (User) => User.pictures)
  author: User;

  @ManyToMany(() => Collection, (Collection) => Collection.pictures)
  collections: Collection[];

  @Column()
  @Field(() => Date, {
    description: 'Date when the picture was added into the database',
  })
  creationDate: Date;

  @Column()
  @Field(() => Boolean, { description: 'If the picture is active or not' })
  isActive: boolean;
}

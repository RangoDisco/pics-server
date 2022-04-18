import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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
  @Field(() => String, { description: "Picture's location" })
  location: string;

  @Column()
  @Field(() => Date, { description: 'Date when the picture was taken' })
  date: string;

  @ManyToOne(() => User, (User) => User.pictures)
  author: User;

  @Column()
  @Field(() => Date, {
    description: 'Date when the picture was added in the database',
  })
  creationDate: Date;

  @Column()
  @Field(() => Boolean, { description: 'If the picture is active or not' })
  isActive: boolean;
}

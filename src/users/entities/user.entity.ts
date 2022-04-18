import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Picture } from 'src/pictures/entities/picture.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: "Users's id" })
  id: number;

  @Column()
  @Field(() => String, { description: "User's username" })
  username: string;

  @Column()
  @Field(() => String, { description: "User's password" })
  password: string;

  @Column()
  @Field(() => String, { description: "User's role" })
  role: string;

  @OneToMany(() => Picture, (Picture) => Picture.author)
  pictures: Picture[];

  @Column()
  @Field(() => Date, { description: "User's creation date" })
  creationDate: Date;

  @Column()
  @Field(() => Boolean, { description: 'If the picture is active or not' })
  isActive: boolean;
}

import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { ERole } from 'src/auth/roles/roles.enum';
import { Picture } from 'src/pictures/entities/picture.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

registerEnumType(ERole, {
  name: 'ERole',
});
@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: "Users's id" })
  id: number;

  @Column()
  @Field(() => String, { description: "User's username" })
  username: string;

  @Column({ select: false })
  @Field(() => String, { description: "User's password" })
  password: string;

  @Column()
  @Field(() => ERole, { description: "User's role" })
  role: ERole;

  @OneToMany(() => Picture, (Picture) => Picture.author)
  pictures: Picture[];

  @Column()
  @Field(() => Date, { description: "User's creation date" })
  creationDate: Date;

  @Column()
  @Field(() => Boolean, { description: 'If the picture is active or not' })
  isActive: boolean;
}

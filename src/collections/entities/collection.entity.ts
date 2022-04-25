import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
export class Collection {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field(() => String, { description: "Collection's title" })
  title: string;

  @Column()
  @Field(() => Date, { description: "Collection's date" })
  date: Date;

  @Column()
  @Field(() => String, { description: "Collection's description" })
  description: string;

  @ManyToOne(() => Category, (Category) => Category.collections)
  category: Category;

  @ManyToMany(() => Tag, (Tag) => Tag.collections)
  @JoinColumn()
  tags: Tag[];

  @ManyToMany(() => Picture, (Picture) => Picture.collections)
  @JoinTable()
  pictures: Picture[];

  @Column()
  @Field(() => String)
  musicLink: string;
}

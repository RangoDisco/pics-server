import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
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

  @Field(() => Category)
  @ManyToOne(() => Category, (Category) => Category.collections, { lazy: true })
  category: Promise<Category>;

  @ManyToMany(() => Tag, (Tag) => Tag.collections, { lazy: true })
  @JoinTable()
  @Field(() => [Tag])
  tags: Promise<Tag[]>;

  @ManyToMany(() => Picture, (Picture) => Picture.collections)
  @JoinTable({
    name: 'collection_picture',
    joinColumn: {
      name: 'collectionId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pictureId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Picture])
  pictures: Promise<Picture[]>;

  @Column()
  @Field(() => String)
  musicLink: string;
}

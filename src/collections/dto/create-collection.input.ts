import { InputType, Int, Field } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@InputType()
export class CreateCollectionInput {
  @Field(() => String)
  title: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  category: Category;

  @Field(() => [Int])
  tags: Tag[];

  @Field(() => [Int])
  pictures?: Picture[];

  @Field(() => String)
  musicLink: string;
}

import { InputType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { Collection } from 'src/collections/entities/collection.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@InputType()
export class FilterPictureInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  collection: Collection;

  @Field(() => Int)
  category: Category;

  @Field(() => [Int])
  tags: Tag[];
}

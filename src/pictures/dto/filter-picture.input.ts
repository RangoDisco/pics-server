import { InputType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { Collection } from 'src/collections/entities/collection.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@InputType()
export class FilterPictureInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  collection?: Collection;

  @Field(() => Int, { nullable: true })
  category?: Category;

  @Field(() => [Int], { nullable: true })
  tags?: Tag[];
}

import { Field, InputType, Int } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { PaginationInputType } from 'src/pagination/pagination.input';
import { Tag } from 'src/tags/entities/tag.entity';

@InputType()
export class FilterCollectionInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  category?: Category;

  @Field(() => [Int], { nullable: true })
  tags?: Tag[];

  @Field(() => PaginationInputType, { nullable: true })
  pagination?: PaginationInputType;
}

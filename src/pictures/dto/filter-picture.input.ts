import { InputType, Field, Int } from '@nestjs/graphql';
import { Collection } from 'src/collections/entities/collection.entity';
import { PaginationInputType } from 'src/pagination/pagination.input';

@InputType()
export class FilterPictureInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  collection?: Collection;

  @Field(() => PaginationInputType, { nullable: true })
  pagination?: PaginationInputType;
}

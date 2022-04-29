import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Collection } from 'src/collections/entities/collection.entity';

@ObjectType()
export class CollectionsPage {
  @Field(() => [Collection])
  collections: Collection[];

  @Field(() => Int)
  totalCount: number;
}

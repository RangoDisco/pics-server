import { InputType, Int, Field } from '@nestjs/graphql';
import { Collection } from 'src/collections/entities/collection.entity';

@InputType()
export class CreateTagInput {
  @Field(() => String)
  title: string;

  @Field(() => [Int])
  collections: Promise<Collection[]>;
}

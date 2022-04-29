import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInputType {
  @Field(() => Int)
  first: number;

  @Field(() => Int)
  after: number;
}

@InputType()
export class OrderByInputType {
  @Field()
  direction: string;
}

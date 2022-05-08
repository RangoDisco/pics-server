import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePictureInput {
  @Field(() => String)
  location: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  contentUrl: string;

  @Field(() => [Int])
  collections: number[];
}

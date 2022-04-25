import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePictureInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  location: string;

  @Field(() => Date)
  date: string;
}

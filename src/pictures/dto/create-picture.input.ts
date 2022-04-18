import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePictureInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

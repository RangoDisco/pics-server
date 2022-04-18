import { CreatePictureInput } from './create-picture.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePictureInput extends PartialType(CreatePictureInput) {
  @Field(() => Int)
  id: number;
}

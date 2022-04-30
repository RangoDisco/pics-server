import { InputType, Int, Field } from '@nestjs/graphql';
import { Picture } from 'src/pictures/entities/picture.entity';

@InputType()
export class CreateCollectionInput {
  @Field(() => String)
  title: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  category: number;

  @Field(() => [Int])
  tags: number[];

  @Field(() => [Int])
  pictures?: Promise<Picture[]>;

  @Field(() => String)
  musicLink: string;
}

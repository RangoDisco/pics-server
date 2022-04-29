import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Picture } from 'src/pictures/entities/picture.entity';

@ObjectType()
export class PicturePage {
  @Field(() => [Picture])
  pictures: Picture[];

  @Field(() => Int)
  totalCount: number;
}

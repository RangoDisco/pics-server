import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PicturesService } from './pictures.service';
import { Picture } from './entities/picture.entity';
import { CreatePictureInput } from './dto/create-picture.input';
import { UpdatePictureInput } from './dto/update-picture.input';

@Resolver(() => Picture)
export class PicturesResolver {
  constructor(private readonly picturesService: PicturesService) {}

  @Mutation(() => Picture)
  createPicture(
    @Args('createPictureInput') createPictureInput: CreatePictureInput,
  ) {
    return this.picturesService.create(createPictureInput);
  }

  @Query(() => [Picture], { name: 'pictures' })
  findAll() {
    return this.picturesService.findAll();
  }

  @Query(() => Picture, { name: 'picture' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.picturesService.findOne(id);
  }

  // @Mutation(() => Picture)
  // updatePicture(
  //   @Args('updatePictureInput') updatePictureInput: UpdatePictureInput,
  // ) {
  //   return this.picturesService.update(
  //     updatePictureInput.id,
  //     updatePictureInput,
  //   );
  // }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PicturesService } from './pictures.service';
import { Picture } from './entities/picture.entity';
import { CreatePictureInput } from './dto/create-picture.input';
import { FilterPictureInput } from './dto/filter-picture.input';
import { createWriteStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
@Resolver(() => Picture)
export class PicturesResolver {
  constructor(private readonly picturesService: PicturesService) {}

  @Mutation(() => Picture)
  createPicture(
    @Args('createPictureInput') createPictureInput: CreatePictureInput,
  ): Promise<Picture> {
    return this.picturesService.create(createPictureInput);
  }

  @Mutation(() => String)
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<string> {
    const newFileName = uuidv4() + '.' + filename.split('.').pop();
    const res = await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${newFileName}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
    if (res) {
      return newFileName;
    }
  }

  @Query(() => [Picture], { name: 'pictures' })
  findAll() {
    return this.picturesService.findAll();
  }

  @Query(() => Picture, { name: 'picture' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.picturesService.findOne(id);
  }

  @Query(() => Picture, { name: 'picture' })
  findBy(@Args('filterPictureInput') filterPictureInput: FilterPictureInput) {
    return this.picturesService.findBy(filterPictureInput);
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

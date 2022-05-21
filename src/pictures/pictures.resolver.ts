import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PicturesService } from './pictures.service';
import { Picture } from './entities/picture.entity';
import { CreatePictureInput } from './dto/create-picture.input';
import { FilterPictureInput } from './dto/filter-picture.input';
import { ERole } from 'src/auth/roles/roles.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles/roles-auth.guard';
import { PicturePage } from 'src/pagination/pictures.page';
import { GraphQLUpload } from 'graphql-upload';
import * as dotenv from 'dotenv';

dotenv.config();
@Resolver(() => Picture)
export class PicturesResolver {
  constructor(private readonly picturesService: PicturesService) {}

  @UseGuards(RolesGuard)
  @Roles(ERole.Admin)
  @Mutation(() => Picture)
  createPicture(
    @Args('createPictureInput') createPictureInput: CreatePictureInput,
  ): Promise<Picture> {
    return this.picturesService.create(createPictureInput);
  }

  @UseGuards(RolesGuard)
  @Roles(ERole.Admin)
  @Mutation(() => String)
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload })
    { createReadStream, filename, encoding, mimetype }: any,
  ): Promise<unknown> {
    const stream = createReadStream();
    return await this.picturesService.uploadFile({
      stream,
      filename,
      encoding,
      mimetype,
    });
  }

  @UseGuards(RolesGuard)
  @Roles(ERole.User)
  @Query(() => PicturePage, { name: 'picturesPage' })
  findAllBy(
    @Args('filterPictureInput') filterPictureInput: FilterPictureInput,
  ) {
    return this.picturesService.findAllBy(filterPictureInput);
  }

  @UseGuards(RolesGuard)
  @Roles(ERole.User)
  @Query(() => Picture, { name: 'picture' })
  findBy(@Args('filterPictureInput') filterPictureInput: FilterPictureInput) {
    return this.picturesService.findBy(filterPictureInput);
  }

  @UseGuards(RolesGuard)
  @Roles(ERole.User)
  @Query(() => Picture, { name: 'pictureRandom' })
  async findRandom() {
    return this.picturesService.findRandom();
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

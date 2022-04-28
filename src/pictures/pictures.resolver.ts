import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PicturesService } from './pictures.service';
import { Picture } from './entities/picture.entity';
import { CreatePictureInput } from './dto/create-picture.input';
import { FilterPictureInput } from './dto/filter-picture.input';
import { createWriteStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ERole } from 'src/auth/roles/roles.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles/roles-auth.guard';
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

  @UseGuards(RolesGuard)
  @Roles(ERole.User)
  @Query(() => [Picture], { name: 'pictures' })
  findAll() {
    return this.picturesService.findAll();
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

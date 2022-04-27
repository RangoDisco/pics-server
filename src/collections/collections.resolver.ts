import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CollectionsService } from './collections.service';
import { Collection } from './entities/collection.entity';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles/roles-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ERole } from 'src/auth/roles/roles.enum';

@Resolver(() => Collection)
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @UseGuards(RolesGuard)
  @Roles(ERole.Admin)
  @Mutation(() => Collection)
  createCollection(
    @Args('createCollectionInput') createCollectionInput: CreateCollectionInput,
  ) {
    return this.collectionsService.create(createCollectionInput);
  }

  @UseGuards(RolesGuard)
  @Roles(ERole.User)
  @Query(() => [Collection], { name: 'collections' })
  findAll() {
    return this.collectionsService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(ERole.User)
  @Query(() => Collection, { name: 'collection' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.collectionsService.findOne(id);
  }
}

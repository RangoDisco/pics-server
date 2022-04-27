import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { CreateTagInput } from './dto/create-tag.input';
import { RolesGuard } from 'src/auth/roles/roles-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ERole } from 'src/auth/roles/roles.enum';

@Resolver(() => Tag)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @UseGuards(RolesGuard)
  @Roles(ERole.Admin)
  @Mutation(() => Tag)
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagsService.create(createTagInput);
  }

  @UseGuards(RolesGuard)
  @Roles(ERole.User)
  @Query(() => [Tag], { name: 'tags' })
  findAll() {
    return this.tagsService.findAll();
  }
}

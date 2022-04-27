import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles/roles-auth.guard';
import { ERole } from 'src/auth/roles/roles.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(RolesGuard)
  @Roles(ERole.Admin)
  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @UseGuards(RolesGuard)
  @Roles(ERole.User)
  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoriesService.findAll();
  }
}

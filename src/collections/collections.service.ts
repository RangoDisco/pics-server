import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { CollectionsPage } from 'src/pagination/collections.page';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { CreateCollectionInput } from './dto/create-collection.input';
import { FilterCollectionInput } from './dto/filter-collections';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
    private categoriesService: CategoriesService,
    private tagsService: TagsService,
  ) {}

  async create(createCollectionInput: CreateCollectionInput) {
    const category = await this.categoriesService.findOne(
      createCollectionInput.category,
    );
    const tags = [];
    for (const tag of createCollectionInput.tags) {
      const tagToAdd = await this.tagsService.findOne(tag);
      if (tagToAdd) {
        tags.push(tagToAdd);
      }
    }
    if (category) {
      const newCollection = this.collectionsRepository.create({
        title: createCollectionInput.title,
        description: createCollectionInput.description,
        musicLink: createCollectionInput.musicLink,
        pictures: createCollectionInput.pictures,
        date: createCollectionInput.date,
      });
      newCollection.tags = Promise.resolve(tags);
      category && (newCollection.category = Promise.resolve(category));
      return await this.collectionsRepository.save(newCollection);
    }
  }

  async findAllBy(
    filterCollectionInput: FilterCollectionInput,
  ): Promise<CollectionsPage> {
    const [collections, totalCount] =
      await this.collectionsRepository.findAndCount({
        take: filterCollectionInput?.pagination.first || 20,
        skip: filterCollectionInput?.pagination?.after || 0,
      });
    return { collections, totalCount };
  }

  async findOne(id: number) {
    return await this.collectionsRepository.findOneBy({ id });
  }
}

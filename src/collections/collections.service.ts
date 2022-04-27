import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { CreateCollectionInput } from './dto/create-collection.input';
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
      console.log('tagToAdd', tagToAdd);
      if (tagToAdd) {
        tags.push(tagToAdd);
      }
    }
    console.log('tags', tags);
    if (category) {
      const newCollection = this.collectionsRepository.create({
        title: createCollectionInput.title,
        description: createCollectionInput.description,
        musicLink: createCollectionInput.musicLink,
        pictures: createCollectionInput.pictures,
        date: createCollectionInput.date,
      });
      newCollection.tags = Promise.resolve(tags);
      newCollection.category = Promise.resolve(category);
      console.log(newCollection);
      return await this.collectionsRepository.save(newCollection);
    }
  }

  async findAll() {
    return await this.collectionsRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.collectionsRepository.findOneBy({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagInput } from './dto/create-tag.input';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async create(createTagInput: CreateTagInput) {
    const newTag = this.tagsRepository.create(createTagInput);
    return await this.tagsRepository.save(newTag);
  }

  async findAll() {
    return await this.tagsRepository.find();
  }

  async findOne(id: number): Promise<Tag> {
    return await this.tagsRepository.findOneBy({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
  ) {}

  async create(createCollectionInput: CreateCollectionInput) {
    const newCollection = this.collectionsRepository.create(
      createCollectionInput,
    );
    return await this.collectionsRepository.save(newCollection);
  }

  async findAll() {
    return await this.collectionsRepository.find();
  }

  async findOne(id: number) {
    return await this.collectionsRepository.findOneBy({ id });
  }

  update(id: number, updateCollectionInput: UpdateCollectionInput) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}

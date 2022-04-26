import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePictureInput } from './dto/create-picture.input';
import { FilterPictureInput } from './dto/filter-picture.input';
import { Picture } from './entities/picture.entity';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
  ) {}
  async create(createPictureInput: CreatePictureInput): Promise<Picture> {
    const newPicture = this.picturesRepository.create(createPictureInput);
    newPicture.isActive = true;
    newPicture.creationDate = new Date();
    return await this.picturesRepository.save(newPicture);
  }
  findAll(): Promise<Picture[]> {
    return this.picturesRepository.find();
  }

  findOne(id: number): Promise<Picture> {
    return this.picturesRepository.findOneBy({ id });
  }

  async findBy(filterPictureInput: FilterPictureInput): Promise<Picture[]> {
    // const queryBuilder = await this.dataSource
    //   .createQueryBuilder()
    //   .select('picture')
    //   .from(Picture, 'picture')
    //   .where()
    return [];
  }

  async remove(id: string): Promise<void> {
    await this.picturesRepository.delete(id);
  }
}

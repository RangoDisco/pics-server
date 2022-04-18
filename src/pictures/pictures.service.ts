import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePictureInput } from './dto/create-picture.input';
import { Picture } from './entities/picture.entity';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
  ) {}
  async create(createPictureInput: CreatePictureInput): Promise<string> {
    // const newPicture = this.picturesRepository.create(createPictureInput);
    // return await this.picturesRepository.save(newPicture);
    return '';
  }
  findAll(): Promise<Picture[]> {
    return this.picturesRepository.find();
  }

  findOne(id: number): Promise<Picture[]> {
    //return this.picturesRepository.findOne(id);
    return this.picturesRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.picturesRepository.delete(id);
  }
}

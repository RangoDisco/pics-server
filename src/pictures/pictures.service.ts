import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionsService } from 'src/collections/collections.service';
import { PicturePage } from 'src/pagination/pictures.page';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePictureInput } from './dto/create-picture.input';
import { FilterPictureInput } from './dto/filter-picture.input';
import { Picture } from './entities/picture.entity';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
    private usersService: UsersService,
    private collectionsService: CollectionsService,
  ) {}
  async create(createPictureInput: CreatePictureInput): Promise<Picture> {
    const newPicture = this.picturesRepository.create({
      title: createPictureInput.title,
      location: createPictureInput.location,
      date: createPictureInput.date,
      contentUrl: createPictureInput.contentUrl,
    });
    newPicture.isActive = true;
    newPicture.creationDate = new Date();

    const author = await this.usersService.findOne(null, 1);

    const collection = await this.collectionsService.findOne(
      createPictureInput.collections[0],
    );

    newPicture.author = author;
    newPicture.collections = Promise.resolve([collection]);
    return await this.picturesRepository.save(newPicture);
  }

  async findAllBy(
    filterPictureInput: FilterPictureInput,
  ): Promise<PicturePage> {
    const [pictures, totalCount] = await this.picturesRepository.findAndCount({
      take: filterPictureInput?.pagination?.first || 20,
      skip: filterPictureInput?.pagination?.after || 0,
    });
    return { pictures, totalCount };
  }

  findOne(id: number): Promise<Picture> {
    return this.picturesRepository.findOneBy({ id });
  }

  async findBy(filterPictureInput: FilterPictureInput): Promise<Picture> {
    return await this.picturesRepository.findOneBy({
      id: filterPictureInput.id,
    });
  }

  async findRandom(): Promise<Picture> {
    return await this.picturesRepository
      .createQueryBuilder()
      .select('p')
      .from(Picture, 'p')
      .orderBy('RAND()')
      .limit(1)
      .getOne();
  }

  async remove(id: string): Promise<void> {
    await this.picturesRepository.delete(id);
  }
}

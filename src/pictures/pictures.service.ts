import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionsService } from 'src/collections/collections.service';
import { PicturePage } from 'src/pagination/pictures.page';
import { UsersService } from 'src/users/users.service';
import { CreateDateColumn, Repository } from 'typeorm';
import { DoSpacesServiceLib } from '.';
import { CreatePictureInput } from './dto/create-picture.input';
import { FilterPictureInput } from './dto/filter-picture.input';
import { Picture } from './entities/picture.entity';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
    private usersService: UsersService,
    private collectionsService: CollectionsService,
    @Inject(DoSpacesServiceLib)
    private readonly s3: AWS.S3,
  ) {}

  async create(createPictureInput: CreatePictureInput): Promise<Picture> {
    const newPicture = this.picturesRepository.create({
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

  async uploadFile(file: any) {
    const fileName = uuidv4() + '.' + file.filename.split('.').pop();

    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Bucket: process.env.AWS_BUCKET,
          Key: fileName,
          Body: file.stream,
          ContentType: 'image/jpg',
          ACL: 'public-read',
        },
        (error: AWS.AWSError) => {
          if (!error) {
            resolve(`${process.env.AWS_SPACE_URL}/${fileName}`);
          } else {
            reject(
              new Error(
                `DoSpaceService_ERROR: ${
                  error.message || 'Something went wrong'
                }`,
              ),
            );
          }
        },
      );
    });
  }

  async findAllBy(
    filterPictureInput: FilterPictureInput,
  ): Promise<PicturePage> {
    const [pictures, totalCount] = await this.picturesRepository.findAndCount({
      take: filterPictureInput?.pagination?.first || 20,
      skip: filterPictureInput?.pagination?.after || 0,
      order: {
        creationDate: 'DESC',
      },
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
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
  }

  async remove(id: string): Promise<void> {
    await this.picturesRepository.delete(id);
  }
}

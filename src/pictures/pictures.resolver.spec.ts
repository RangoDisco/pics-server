import { Test, TestingModule } from '@nestjs/testing';
import { PicturesResolver } from './pictures.resolver';
import { PicturesService } from './pictures.service';

describe('PicturesResolver', () => {
  let resolver: PicturesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PicturesResolver, PicturesService],
    }).compile();

    resolver = module.get<PicturesResolver>(PicturesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

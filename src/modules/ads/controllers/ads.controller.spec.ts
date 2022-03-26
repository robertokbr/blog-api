import { Test, TestingModule } from '@nestjs/testing';
import { AdsService } from '../services/ads.service';
import { AdsController } from './ads.controller';

describe('AdsController', () => {
  let controller: AdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdsController],
      providers: [AdsService],
    }).compile();

    controller = module.get<AdsController>(AdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

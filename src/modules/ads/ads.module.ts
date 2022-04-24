import { Module } from '@nestjs/common';
import { AdsController } from './controllers/ads.controller';
import { AdsRepository } from './repository/ads.repository';
import { AdsService } from './services/ads.service';

@Module({
  controllers: [AdsController],
  providers: [AdsService, AdsRepository],
})
export class AdsModule {}

import { Module } from '@nestjs/common';
import { AdContentsController } from './controllers/ad-contents.controller';
import { PostAdsController } from './controllers/post-ad.controller';
import { AdContentsRepository } from './repository/ad-contents.repository';
import { PostAdsRepository } from './repository/post-ads.repository';
import { AdContentsService } from './services/ad-contents.service';
import { PostAdsService } from './services/post-ads.service';

@Module({
  controllers: [AdContentsController, PostAdsController],
  providers: [
    AdContentsService,
    AdContentsRepository,
    PostAdsService,
    PostAdsRepository,
  ],
})
export class AdsModule {}

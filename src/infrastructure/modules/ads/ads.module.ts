import { Module } from '@nestjs/common';
import { AdsController } from './controllers/ads.controller';
import { AdAsideTypeAttributesRepository } from './repository/ad-aside-type-attributes.repository';
import { AdCommentTypeAttributesRepository } from './repository/ad-comment-type-attributes.repository';
import { AdPostTypeAttributesRepository } from './repository/ad-post-type-attributes.respository';
import { AdsRepository } from './repository/ads.repository';
import { AdsService } from './services/ads.service';

@Module({
  controllers: [AdsController],
  providers: [
    AdsService,
    AdsRepository,
    AdAsideTypeAttributesRepository,
    AdCommentTypeAttributesRepository,
    AdPostTypeAttributesRepository,
  ],
})
export class AdsModule {}

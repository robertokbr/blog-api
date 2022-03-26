import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AdsController } from './controllers/ads.controller';
import { AdsRepository } from './repository/ads.repository';
import { AdsService } from './services/ads.service';

@Module({
  controllers: [AdsController],
  providers: [AdsService, AdsRepository, PrismaClient],
})
export class AdsModule {}

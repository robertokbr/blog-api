import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AdsModule } from './modules/ads/ads.module';
import { PrismaModule } from './infra/prisma/prisma.module';

@Module({
  imports: [UsersModule, PostsModule, AdsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

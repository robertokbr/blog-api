import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './modules/common/providers/prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

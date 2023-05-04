import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './infrastructure/modules/users/users.module';
import { PostsModule } from './infrastructure/modules/posts/posts.module';
import { LoggerModule } from 'nestjs-pino';
import { CommonModule } from './infrastructure/common/common.module';
import { pinoConfig } from './configs/pino.config';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    PostsModule,
    LoggerModule.forRoot(pinoConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

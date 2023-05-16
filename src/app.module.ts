import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './configs/pino.config';
import { CommonModule } from './modules/common/common.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';

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

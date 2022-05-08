import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AdsModule } from './modules/ads/ads.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AdsModule,
    PrismaModule,
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        quietReqLogger: true,
        transport: {
          target: 'pino-http-print', // use the pino-http-print transport and its formatting output
          options: {
            all: true,
            translateTime: true,
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

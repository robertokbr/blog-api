import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { CommentRatesRepository } from './repositories/comment-rates.repository';
import { CommentsRepository } from './repositories/comments.repository';
import { PostAccessRepository } from './repositories/post-access.repository';
import { PostRatesRepository } from './repositories/post-rates.repository';
import { PostTagsRepository } from './repositories/post-tags.repository';
import { PostsRepository } from './repositories/posts.repository';
import { PostCommentsService } from './services/post-comments.service';
import { PostRatesService } from './services/post-rates.service';
import { PostsService } from './services/posts.service';
import { StabilityAIImageGeneratorProvider } from './providers/image-generator.provider';
import { S3BucketProvider } from './providers/bucket.provider';

@Module({
  controllers: [PostsController],
  providers: [
    PostsRepository,
    PostRatesRepository,
    CommentRatesRepository,
    PostTagsRepository,
    CommentsRepository,
    PostsService,
    PostRatesService,
    PostCommentsService,
    PostAccessRepository,
    StabilityAIImageGeneratorProvider,
    S3BucketProvider,
  ],
})
export class PostsModule {}

import { Module } from '@nestjs/common';
import { PostCommentsController } from './controllers/post-comments.controller';
import { PostMetricsController } from './controllers/post-metrics.controller';
import { PostRatesController } from './controllers/post-rates.controller';
import { PostsController } from './controllers/posts.controller';
import { CommentRatesRepository } from './repositories/comment-rates.repository';
import { CommentsRepository } from './repositories/comments.repository';
import { PostAccessRepository } from './repositories/post-access.repository';
import { PostCandidaturesRepository } from './repositories/post-candidatures.repository';
import { PostRatesRepository } from './repositories/post-rates.repository';
import { PostTagsRepository } from './repositories/post-tags.repository';
import { PostsRepository } from './repositories/posts.repository';
import { PostCandidaturesService } from './services/post-candidatures.service';
import { PostCommentsService } from './services/post-comments.service';
import { PostMetricsService } from './services/post-metrics.service';
import { PostRatesService } from './services/post-rates.service';
import { PostsService } from './services/posts.service';

@Module({
  controllers: [
    PostsController,
    PostRatesController,
    PostCommentsController,
    PostMetricsController,
  ],
  providers: [
    PostsRepository,
    PostRatesRepository,
    CommentRatesRepository,
    PostTagsRepository,
    CommentsRepository,
    PostCandidaturesRepository,
    PostAccessRepository,
    PostsService,
    PostRatesService,
    PostMetricsService,
    PostCommentsService,
    PostCandidaturesService,
  ],
})
export class PostsModule {}

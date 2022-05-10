import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { CommentRatesRepository } from './repositories/comment-rates.repository';
import { CommentsRepository } from './repositories/comments.repository';
import { PostAcessRepository } from './repositories/post-acess.repository';
import { PostCandidaturesRepository } from './repositories/post-candidatures.repository';
import { PostRatesRepository } from './repositories/post-rates.repository';
import { PostTagsRepository } from './repositories/post-tags.repository';
import { PostsRepository } from './repositories/posts.repository';
import { PostCandidaturesService } from './services/post-candidatures.service';
import { PostCommentsService } from './services/post-comments.service';
import { PostMetricsService } from './services/post-metrics.service';
import { PostRatesService } from './services/post-rates.service.ts';
import { PostsService } from './services/posts.service';

@Module({
  controllers: [PostsController],
  providers: [
    PostsRepository,
    PostRatesRepository,
    CommentRatesRepository,
    PostTagsRepository,
    CommentsRepository,
    PostCandidaturesRepository,
    PostAcessRepository,
    PostsService,
    PostRatesService,
    PostMetricsService,
    PostCommentsService,
    PostCandidaturesService,
  ],
})
export class PostsModule {}

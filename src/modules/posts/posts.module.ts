import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { CommentRatesRepository } from './repositories/comment-rates.repository';
import { CommentsRepository } from './repositories/comments.repository';
import { PostCandidaturesRepository } from './repositories/post-candidatures.repository';
import { PostRatesRepository } from './repositories/post-rates.repository';
import { PostTagsRepository } from './repositories/post-tags.repository';
import { PostsRepository } from './repositories/posts.repository';
import { PostsService } from './services/posts.service';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
    PostRatesRepository,
    CommentRatesRepository,
    PostTagsRepository,
    CommentsRepository,
    PostCandidaturesRepository,
  ],
})
export class PostsModule {}

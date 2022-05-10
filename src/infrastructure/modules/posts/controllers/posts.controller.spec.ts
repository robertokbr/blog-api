import { Test, TestingModule } from '@nestjs/testing';
import { CommentRatesRepository } from '../repositories/comment-rates.repository';
import { CommentsRepository } from '../repositories/comments.repository';
import { PostCandidaturesRepository } from '../repositories/post-candidatures.repository';
import { PostRatesRepository } from '../repositories/post-rates.repository';
import { PostsRepository } from '../repositories/posts.repository';
import { PostsService } from '../services/posts.service';
import { PostsController } from './posts.controller';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        PostsRepository,
        PostRatesRepository,
        CommentRatesRepository,
        CommentsRepository,
        PostCandidaturesRepository,
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

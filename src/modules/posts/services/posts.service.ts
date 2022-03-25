import { Injectable } from '@nestjs/common';
import { CommentRateDto } from '../dto/comment-rate.dto';
import { CommentDto } from '../dto/comment.dto';
import { CreateCommentRateDto } from '../dto/create-comment-rate.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreatePostCandidatureDto } from '../dto/create-post-candidature.dto';
import { CreatePostRateDto } from '../dto/create-post-rate.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { FindPostByQueryDto } from '../dto/find-post-by-query.dto';
import { PostCandidatureDto } from '../dto/post-candidature.dto';
import { PostRateDto } from '../dto/post-rate.dto';
import { PostDto } from '../dto/post.dto';
import { UpdateCommentRateDto } from '../dto/update-comment-rate.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { UpdatePostRateDto } from '../dto/update-post-rate.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostCandidaturesRepository } from '../repositories/post-candidatures.repository';
import { CommentRatesRepository } from '../repositories/comment-rates.repository';
import { CommentsRepository } from '../repositories/comments.repository';
import { PostRatesRepository } from '../repositories/post-rates.repository';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly commentsRepository: CommentsRepository,
    private readonly postRatesRepository: PostRatesRepository,
    private readonly commentRatesRepository: CommentRatesRepository,
    private readonly postCandidaturesRepository: PostCandidaturesRepository,
  ) {}

  public async create(createPostDto: CreatePostDto): Promise<PostDto> {
    return this.postsRepository.create(createPostDto);
  }

  public async findAll(
    findPostByQueryDto: FindPostByQueryDto,
  ): Promise<PostDto[]> {
    return this.postsRepository.findAll(findPostByQueryDto);
  }

  public async findOne(slug: string): Promise<PostDto> {
    return this.postsRepository.findBySlug(slug);
  }

  public async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostDto> {
    return this.postsRepository.update(id, updatePostDto);
  }

  public async createPostRate(
    createPostRateDto: CreatePostRateDto,
  ): Promise<PostRateDto> {
    return this.postRatesRepository.create(createPostRateDto);
  }

  public async updatePostRate(
    postRateId: number,
    updatePostRateDto: UpdatePostRateDto,
  ): Promise<PostRateDto> {
    return this.postRatesRepository.update(postRateId, updatePostRateDto);
  }

  public async createComment(
    createCommentDto: CreateCommentDto,
  ): Promise<CommentDto> {
    return this.commentsRepository.create(createCommentDto);
  }

  public async updateComment(
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.commentsRepository.update(commentId, updateCommentDto);
  }

  public async createCommentRate(
    createCommentRateDto: CreateCommentRateDto,
  ): Promise<CommentRateDto> {
    return this.commentRatesRepository.create(createCommentRateDto);
  }

  public async updateCommentRate(
    commentRateId: number,
    updateCommentRateDto: UpdateCommentRateDto,
  ): Promise<CommentRateDto> {
    return this.commentRatesRepository.update(
      commentRateId,
      updateCommentRateDto,
    );
  }

  public async createPostCandidature(
    createCandidatureDto: CreatePostCandidatureDto,
  ): Promise<PostCandidatureDto> {
    const postCandidature = await this.postCandidaturesRepository.create(
      createCandidatureDto,
    );

    // Prisma deal with enums in a differente way;
    return postCandidature as PostCandidatureDto;
  }

  public async updatePostCandidature(
    postCandidatureId: number,
    createCandidatureDto: CreatePostCandidatureDto,
  ): Promise<PostCandidatureDto> {
    const postCandidature = await this.postCandidaturesRepository.update(
      postCandidatureId,
      createCandidatureDto,
    );

    // Prisma deal with enums in a differente way;
    return postCandidature as PostCandidatureDto;
  }
}

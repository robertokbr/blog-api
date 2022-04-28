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
import { PostTagsRepository } from '../repositories/post-tags.repository';
import { PostTagDto } from '../dto/post-tag.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly commentsRepository: CommentsRepository,
    private readonly postRatesRepository: PostRatesRepository,
    private readonly commentRatesRepository: CommentRatesRepository,
    private readonly postCandidaturesRepository: PostCandidaturesRepository,
    private readonly postTagsRepository: PostTagsRepository,
  ) {}

  public async create(createPostDto: CreatePostDto): Promise<PostDto> {
    createPostDto.description = createPostDto.content
      .replace(/#+\s/gi, '')
      .replace(/\n{2,}/gi, '\n')
      .trim()
      .slice(0, 400);

    console.log({ des: createPostDto.description });

    return this.postsRepository.create(createPostDto);
  }

  public async findAll(
    findPostByQueryDto: FindPostByQueryDto,
  ): Promise<PostDto[]> {
    const post = await this.postsRepository.findAll(findPostByQueryDto);

    return post as PostDto[];
  }

  public async findOne(slug: string): Promise<PostDto> {
    const post = await this.postsRepository.findBySlug(slug);

    return post as PostDto;
  }

  public async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostDto> {
    return this.postsRepository.update(id, updatePostDto);
  }

  public async delete(id: number): Promise<PostDto> {
    return this.postsRepository.delete(id);
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

  public async deleteComment(commentId: number): Promise<CommentDto> {
    return this.commentsRepository.delete(commentId);
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

    return postCandidature as PostCandidatureDto;
  }

  public async findAllPostTags(): Promise<PostTagDto[]> {
    const tags = await this.postTagsRepository.findAll();

    const names = tags.map((tag) => tag.name);

    const filteredNames = new Set(names);

    const filteredTags = [...filteredNames].map((tag) => {
      const ft = new PostTagDto();
      ft.name = tag;
      return ft;
    });

    return [...filteredTags];
  }
}

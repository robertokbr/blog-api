import { Injectable } from '@nestjs/common';

import { CommentRatesRepository } from '../repositories/comment-rates.repository';
import { PostRatesRepository } from '../repositories/post-rates.repository';
import { CommentRateDto } from '../dto/comment-rate.dto';
import { CreateCommentRateDto } from '../dto/create-comment-rate.dto';
import { CreatePostRateDto } from '../dto/create-post-rate.dto';
import { PostRateDto } from '../dto/post-rate.dto';

@Injectable()
export class PostRatesService {
  constructor(
    private readonly postRatesRepository: PostRatesRepository,
    private readonly commentRatesRepository: CommentRatesRepository,
  ) {}

  public async create({
    postId,
    userId,
    value,
  }: CreatePostRateDto): Promise<PostRateDto> {
    const [postRate] = await this.postRatesRepository.findAll({
      userId,
      postId,
    });

    const postDto = { postId, userId, value };

    if (!postRate) return this.postRatesRepository.create(postDto);

    return this.postRatesRepository.update(postRate.id, postDto);
  }

  public async findAllCommentRate(commentId: number) {
    return this.commentRatesRepository.findAll({ commentId });
  }

  public async createCommentRate(
    data: CreateCommentRateDto,
  ): Promise<CommentRateDto> {
    const { commentId, userId } = data;

    const [commentRate] = await this.commentRatesRepository.findAll({
      commentId,
      userId,
    });

    if (!commentRate) return this.commentRatesRepository.create(data);

    return this.commentRatesRepository.update(commentRate.id, data);
  }
}

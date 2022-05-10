import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreatePostRateDto } from '../../../../domain/modules/posts/dto/create-post-rate.dto';
import { PostRateDto } from '../../../../domain/modules/posts/dto/post-rate.dto';
import { CreateCommentRateDto } from '../../../../domain/modules/posts/dto/create-comment-rate.dto';
import { CommentRateDto } from '../../../../domain/modules/posts/dto/comment-rate.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostRatesService } from '../services/post-rates.service.ts';

@ApiTags('rates')
@Controller('/posts/rates')
export class PostRatesController {
  constructor(private readonly postRatesService: PostRatesService) {}

  @ApiResponse({
    type: PostRateDto,
  })
  @Post('/rate')
  public async create(
    @Body() createPostRateDto: CreatePostRateDto,
  ): Promise<PostRateDto> {
    return this.postRatesService.create(createPostRateDto);
  }

  @ApiResponse({
    type: [PostRateDto],
  })
  @Get('/rate')
  async findAll(@Query('postId') postId: string) {
    console.log(postId);
    return this.postRatesService.findAll(+postId);
  }

  @ApiResponse({
    type: CommentRateDto,
  })
  @Post('/comments/rate')
  public async createCommentRate(
    @Body() createCommentRateDto: CreateCommentRateDto,
  ): Promise<CommentRateDto> {
    return this.postRatesService.createCommentRate(createCommentRateDto);
  }

  @ApiResponse({
    type: [CommentRateDto],
  })
  @Get('/comments/rate')
  public async findAllCommentRate(@Query('commentId') commentId: string) {
    return this.postRatesService.findAllCommentRate(+commentId);
  }
}

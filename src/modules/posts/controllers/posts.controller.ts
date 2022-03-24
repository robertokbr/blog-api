import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostDto } from '../dto/post.dto';
import { FindPostByQueryDto } from '../dto/find-post-by-query.dto';
import { CreatePostRateDto } from '../dto/create-post-rate.dto';
import { PostRateDto } from '../dto/post-rate.dto';
import { UpdatePostRateDto } from '../dto/update-post-rate.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentDto } from '../dto/comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CreateCommentRateDto } from '../dto/create-comment-rate.dto';
import { CommentRateDto } from '../dto/comment-rate.dto';
import { UpdateCommentRateDto } from '../dto/update-comment-rate.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostDto> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query() findPostByQueryDto: FindPostByQueryDto): Promise<PostDto[]> {
    return this.postsService.findAll(findPostByQueryDto);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string): Promise<PostDto> {
    return this.postsService.findOne(slug);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostDto> {
    return this.postsService.update(+id, updatePostDto);
  }

  @Post('/rate')
  public async createPostRate(
    @Body() createPostRateDto: CreatePostRateDto,
  ): Promise<PostRateDto> {
    return this.postsService.createPostRate(createPostRateDto);
  }

  @Put('/rate/:postRateId')
  public async updatePostRate(
    @Param('postRateId') postRateId: number,
    @Body() updatePostRateDto: UpdatePostRateDto,
  ): Promise<PostRateDto> {
    return this.postsService.updatePostRate(postRateId, updatePostRateDto);
  }

  @Post('/comment')
  public async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDto> {
    return this.postsService.createComment(createCommentDto);
  }

  @Put('/comment/:commentId')
  public async updateComment(
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.postsService.updateComment(commentId, updateCommentDto);
  }

  @Post('/comment/rate')
  public async createCommentRate(
    @Body() createCommentRateDto: CreateCommentRateDto,
  ): Promise<CommentRateDto> {
    return this.postsService.createCommentRate(createCommentRateDto);
  }

  @Put('/comment/rate/:commentRateId')
  public async updateCommentRate(
    @Param('commentRateId') commentRateId: number,
    @Body() updateCommentRateDto: UpdateCommentRateDto,
  ): Promise<CommentRateDto> {
    return this.postsService.updateCommentRate(
      commentRateId,
      updateCommentRateDto,
    );
  }
}

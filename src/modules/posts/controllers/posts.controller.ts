import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostDto } from '../dto/post.dto';
import { FindPostByQueryDto } from '../dto/find-post-by-query.dto';
import { CreatePostRateDto } from '../dto/create-post-rate.dto';
import { PostRateDto } from '../dto/post-rate.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentDto } from '../dto/comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CreateCommentRateDto } from '../dto/create-comment-rate.dto';
import { CommentRateDto } from '../dto/comment-rate.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostCandidatureDto } from '../dto/post-candidature.dto';
import { CreatePostCandidatureDto } from '../dto/create-post-candidature.dto';
import { PostTagDto } from '../dto/post-tag.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiTags('posts')
  @ApiResponse({
    type: PostDto,
  })
  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostDto> {
    return this.postsService.create(createPostDto);
  }

  @ApiTags('posts')
  @ApiResponse({
    type: [PostDto],
  })
  @Get()
  findAll(@Query() findPostByQueryDto: FindPostByQueryDto): Promise<PostDto[]> {
    return this.postsService.findAll(findPostByQueryDto);
  }

  @ApiTags('posts')
  @ApiResponse({
    type: PostDto,
  })
  @Get('/bySlug/:slug')
  findOne(@Param('slug') slug: string): Promise<PostDto> {
    return this.postsService.findOne(slug);
  }

  @ApiTags('posts')
  @ApiResponse({
    type: PostDto,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostDto> {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiTags('posts')
  @ApiResponse({
    type: PostDto,
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<PostDto> {
    return this.postsService.delete(+id);
  }

  @ApiTags('rates')
  @ApiResponse({
    type: PostRateDto,
  })
  @Post('/rate')
  public async createPostRate(
    @Body() createPostRateDto: CreatePostRateDto,
  ): Promise<PostRateDto> {
    return this.postsService.createPostRate(createPostRateDto);
  }

  @ApiTags('rates')
  @ApiResponse({
    type: [PostRateDto],
  })
  @Get('/rate')
  async findAllPostRate(@Query('postId') postId: string) {
    console.log(postId);
    return this.postsService.findAllPostRate(+postId);
  }

  @ApiTags('comments')
  @Get('/comments')
  async findAllComment(@Query('postId') postId: string) {
    return this.postsService.findAllComment(+postId);
  }

  @ApiTags('comments')
  @ApiResponse({
    type: CommentDto,
  })
  @Post('/comments')
  public async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDto> {
    return this.postsService.createComment(createCommentDto);
  }

  @ApiTags('comments')
  @ApiResponse({
    type: CommentDto,
  })
  @Delete('/comments/:commentId')
  public async deleteComment(
    @Param('commentId') commentId: string,
  ): Promise<CommentDto> {
    return this.postsService.deleteComment(+commentId);
  }

  @ApiTags('comments')
  @ApiResponse({
    type: CommentDto,
  })
  @Patch('/comments/:commentId')
  public async updateComment(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.postsService.updateComment(+commentId, updateCommentDto);
  }

  @ApiTags('rates')
  @ApiResponse({
    type: CommentRateDto,
  })
  @Post('/comments/rate')
  public async createCommentRate(
    @Body() createCommentRateDto: CreateCommentRateDto,
  ): Promise<CommentRateDto> {
    return this.postsService.createCommentRate(createCommentRateDto);
  }

  @ApiTags('rates')
  @ApiResponse({
    type: [CommentRateDto],
  })
  @Get('/comments/rate')
  public async findAllCommentRate(@Query('commentId') commentId: string) {
    return this.postsService.findAllCommentRate(+commentId);
  }

  @ApiTags('candidatures')
  @ApiResponse({
    type: PostCandidatureDto,
  })
  @Post('/candidature')
  public async createPostCandidature(
    @Body() createPostCandidatureDto: CreatePostCandidatureDto,
  ): Promise<PostCandidatureDto> {
    return this.postsService.createPostCandidature(createPostCandidatureDto);
  }

  @ApiTags('candidatures')
  @ApiResponse({
    type: PostCandidatureDto,
  })
  @Patch('/candidature/:postCandidatureId')
  public async updatePostCandidature(
    @Param('postCandidatureId') postCandidatureId: string,
    @Body() createPostCandidatureDto: CreatePostCandidatureDto,
  ): Promise<PostCandidatureDto> {
    return this.postsService.updatePostCandidature(
      +postCandidatureId,
      createPostCandidatureDto,
    );
  }

  @ApiTags('tags')
  @ApiResponse({
    type: [PostTagDto],
  })
  @Get('/tags')
  findAllPostTags(): Promise<PostTagDto[]> {
    return this.postsService.findAllPostTags();
  }
}

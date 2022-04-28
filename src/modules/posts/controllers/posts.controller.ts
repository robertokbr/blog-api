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
import { UpdatePostRateDto } from '../dto/update-post-rate.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentDto } from '../dto/comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CreateCommentRateDto } from '../dto/create-comment-rate.dto';
import { CommentRateDto } from '../dto/comment-rate.dto';
import { UpdateCommentRateDto } from '../dto/update-comment-rate.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostCandidatureDto } from '../dto/post-candidature.dto';
import { CreatePostCandidatureDto } from '../dto/create-post-candidature.dto';
import { PostTagDto } from '../dto/post-tag.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    type: PostDto,
  })
  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostDto> {
    return this.postsService.create(createPostDto);
  }

  @ApiResponse({
    type: [PostDto],
  })
  @Get()
  findAll(@Query() findPostByQueryDto: FindPostByQueryDto): Promise<PostDto[]> {
    return this.postsService.findAll(findPostByQueryDto);
  }

  @ApiResponse({
    type: PostDto,
  })
  @Get('/bySlug/:slug')
  findOne(@Param('slug') slug: string): Promise<PostDto> {
    return this.postsService.findOne(slug);
  }

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

  @ApiResponse({
    type: PostDto,
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<PostDto> {
    return this.postsService.delete(+id);
  }

  @ApiResponse({
    type: PostRateDto,
  })
  @Post('/rate')
  public async createPostRate(
    @Body() createPostRateDto: CreatePostRateDto,
  ): Promise<PostRateDto> {
    return this.postsService.createPostRate(createPostRateDto);
  }

  @ApiResponse({
    type: PostRateDto,
  })
  @Patch('/rate/:postRateId')
  public async updatePostRate(
    @Param('postRateId') postRateId: string,
    @Body() updatePostRateDto: UpdatePostRateDto,
  ): Promise<PostRateDto> {
    return this.postsService.updatePostRate(+postRateId, updatePostRateDto);
  }

  @ApiResponse({
    type: CommentDto,
  })
  @Post('/comment')
  public async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDto> {
    return this.postsService.createComment(createCommentDto);
  }

  @ApiResponse({
    type: CommentDto,
  })
  @Delete('/comment/:commentId')
  public async deleteComment(
    @Param('commentId') commentId: string,
  ): Promise<CommentDto> {
    return this.postsService.deleteComment(+commentId);
  }

  @ApiResponse({
    type: CommentDto,
  })
  @Patch('/comment/:commentId')
  public async updateComment(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.postsService.updateComment(+commentId, updateCommentDto);
  }

  @ApiResponse({
    type: CommentRateDto,
  })
  @Post('/comment/rate')
  public async createCommentRate(
    @Body() createCommentRateDto: CreateCommentRateDto,
  ): Promise<CommentRateDto> {
    return this.postsService.createCommentRate(createCommentRateDto);
  }

  @ApiResponse({
    type: CommentRateDto,
  })
  @Patch('/comment/rate/:commentRateId')
  public async updateCommentRate(
    @Param('commentRateId') commentRateId: string,
    @Body() updateCommentRateDto: UpdateCommentRateDto,
  ): Promise<CommentRateDto> {
    return this.postsService.updateCommentRate(
      +commentRateId,
      updateCommentRateDto,
    );
  }

  @ApiResponse({
    type: PostCandidatureDto,
  })
  @Post('/candidature')
  public async createPostCandidature(
    @Body() createPostCandidatureDto: CreatePostCandidatureDto,
  ): Promise<PostCandidatureDto> {
    return this.postsService.createPostCandidature(createPostCandidatureDto);
  }

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

  @ApiResponse({
    type: [PostTagDto],
  })
  @Get('/tags')
  findAllPostTags(): Promise<PostTagDto[]> {
    return this.postsService.findAllPostTags();
  }
}

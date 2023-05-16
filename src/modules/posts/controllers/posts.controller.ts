import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from 'src/modules/common/decorators/get-user.decorator';
import { RequireRole } from 'src/modules/common/decorators/require-role.decorator';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt-auth.guard';
import { NonBlockingJwtAuthGuard } from 'src/modules/common/guards/non-blocking-jwt-auth.guard';
import { RolesGuard } from 'src/modules/common/guards/roles.guard';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { CommentRateDto } from '../dto/comment-rate.dto';
import { CommentDto } from '../dto/comment.dto';
import { CreateCommentRateDto } from '../dto/create-comment-rate.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreatePostRateDto } from '../dto/create-post-rate.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { FindPostByQueryDto } from '../dto/find-post-by-query.dto';
import { PostRateDto } from '../dto/post-rate.dto';
import { PostTagDto } from '../dto/post-tag.dto';
import { PostDto } from '../dto/post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostCommentsService } from '../services/post-comments.service';
import { PostRatesService } from '../services/post-rates.service';
import { Role } from 'src/modules/users/enums/role.enum';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postCommentsService: PostCommentsService,
    private readonly postRatesService: PostRatesService,
  ) {}

  @ApiTags('tags')
  @Get('/tags')
  @ApiResponse({ type: [PostTagDto] })
  findAllPostTags(): Promise<PostTagDto[]> {
    return this.postsService.findAllPostTags();
  }

  @ApiTags('posts')
  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @RequireRole(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ type: PostDto })
  create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: UserDto,
  ): Promise<PostDto> {
    createPostDto['userId'] = +user.id;

    return this.postsService.create(createPostDto);
  }

  @ApiTags('posts')
  @Get()
  @ApiResponse({ type: [PostDto] })
  findAll(@Query() findPostByQueryDto: FindPostByQueryDto): Promise<PostDto[]> {
    return this.postsService.findAll(findPostByQueryDto);
  }

  @ApiTags('posts')
  @UseGuards(NonBlockingJwtAuthGuard)
  @ApiBearerAuth()
  @Get('/:slug')
  @ApiResponse({ type: PostDto })
  findOne(
    @Param('slug') slug: string,
    @GetUser() user: UserDto,
  ): Promise<PostDto> {
    console.log(user);
    return this.postsService.findOne(slug, user?.id);
  }

  @ApiTags('posts')
  @Patch(':id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @RequireRole(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ type: PostDto })
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostDto> {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiTags('posts')
  @Delete(':id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @RequireRole(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ type: PostDto })
  delete(@Param('id') id: string): Promise<PostDto> {
    return this.postsService.delete(+id);
  }

  @ApiTags('comments')
  @Post('/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: CommentDto })
  public async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDto> {
    return this.postCommentsService.create(createCommentDto);
  }

  @ApiTags('comments')
  @Delete('/:id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: CommentDto })
  public async deleteComment(
    @Param('id') id: string,
    @GetUser() user: UserDto,
  ): Promise<CommentDto> {
    return this.postCommentsService.delete(+id, user);
  }

  @ApiTags('rates')
  @Post('/rates')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: PostRateDto })
  public async createRate(
    @Body() createPostRateDto: CreatePostRateDto,
  ): Promise<PostRateDto> {
    return this.postRatesService.create(createPostRateDto);
  }

  @ApiTags('rates')
  @Post('/comments/rates')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: CommentRateDto })
  public async createCommentRate(
    @Body() createCommentRateDto: CreateCommentRateDto,
  ): Promise<CommentRateDto> {
    return this.postRatesService.createCommentRate(createCommentRateDto);
  }
}

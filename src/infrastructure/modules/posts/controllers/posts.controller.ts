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
import { PostTagDto } from '../dto/post-tag.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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

  @ApiTags('tags')
  @ApiResponse({
    type: [PostTagDto],
  })
  @Get('/tags')
  findAllPostTags(): Promise<PostTagDto[]> {
    return this.postsService.findAllPostTags();
  }
}

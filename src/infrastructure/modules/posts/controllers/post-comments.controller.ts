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
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentDto } from '../dto/comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostCommentsService } from '../services/post-comments.service';

@ApiTags('comments')
@Controller('posts/comments')
export class PostCommentsController {
  constructor(private readonly postCommentsService: PostCommentsService) {}

  @Get('/comments')
  async findAll(@Query('postId') postId: string) {
    return this.postCommentsService.findAll(+postId);
  }

  @ApiResponse({
    type: CommentDto,
  })
  @Post('/comments')
  public async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDto> {
    return this.postCommentsService.create(createCommentDto);
  }

  @ApiResponse({
    type: CommentDto,
  })
  @Delete('/comments/:id')
  public async delete(@Param('id') id: string): Promise<CommentDto> {
    return this.postCommentsService.delete(+id);
  }

  @ApiResponse({
    type: CommentDto,
  })
  @Patch('/comments/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.postCommentsService.update(+id, updateCommentDto);
  }
}

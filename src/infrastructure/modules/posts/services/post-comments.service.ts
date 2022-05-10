import { Injectable } from '@nestjs/common';
import { CommentDto } from '../dto/comment.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentsRepository } from '../repositories/comments.repository';

@Injectable()
export class PostCommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async findAll(postId: number) {
    return this.commentsRepository.findAll(postId);
  }

  public async delete(commentId: number): Promise<CommentDto> {
    return this.commentsRepository.delete(commentId);
  }

  public async create(createCommentDto: CreateCommentDto): Promise<CommentDto> {
    return this.commentsRepository.create(createCommentDto);
  }

  public async update(
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.commentsRepository.update(commentId, updateCommentDto);
  }
}

import { Injectable } from '@nestjs/common';
import { CommentDto } from '../../../../domain/modules/posts/dto/comment.dto';
import { CreateCommentDto } from '../../../../domain/modules/posts/dto/create-comment.dto';
import { UpdateCommentDto } from '../../../../domain/modules/posts/dto/update-comment.dto';
import { CommentsRepository } from '../repositories/comments.repository';

@Injectable()
export class PostCommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async findAll(postId: number) {
    return this.commentsRepository.findAll({ postId });
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

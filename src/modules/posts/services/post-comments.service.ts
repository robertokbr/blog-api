import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { CommentDto } from '../dto/comment.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentsRepository } from '../repositories/comments.repository';
import { Role } from 'src/modules/users/enums/role.enum';

@Injectable()
export class PostCommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  public async delete(commentId: number, user: UserDto): Promise<CommentDto> {
    if (user.role !== Role.ADMIN) {
      const [comment] = await this.commentsRepository.findAll({
        userId: user.id,
        id: commentId,
      });

      if (!comment)
        throw new ForbiddenException(
          'You are only allowed to delete your own comments!',
        );
    }

    return this.commentsRepository.delete(commentId);
  }

  public async create(createCommentDto: CreateCommentDto): Promise<CommentDto> {
    return this.commentsRepository.create(createCommentDto);
  }
}

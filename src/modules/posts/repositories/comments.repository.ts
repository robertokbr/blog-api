import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/common/prisma/prisma.service';
import { CommentDto } from '../dto/comment.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly client: PrismaService) {}

  public async create(createCommentDto: CreateCommentDto): Promise<CommentDto> {
    return this.client.comments.create({
      data: createCommentDto,
    });
  }

  public async delete(id: number): Promise<CommentDto> {
    return this.client.comments.delete({
      where: {
        id,
      },
    });
  }

  public async update(id: number, data: UpdateCommentDto): Promise<CommentDto> {
    return this.client.comments.update({
      where: { id },
      data,
    });
  }

  public async findAll(
    data: Partial<Omit<CommentDto, 'user' | 'rates'>>,
  ): Promise<CommentDto[]> {
    return this.client.comments.findMany({
      where: {
        ...data,
      },
      include: {
        user: true,
      },
    }) as Promise<CommentDto[]>;
  }
}

import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

export class CommentsRepository {
  constructor(private readonly client: PrismaClient) {}

  public async create(createCommentDto: CreateCommentDto) {
    return this.client.comments.create({
      data: createCommentDto,
    });
  }

  public async delete(id: number) {
    return this.client.comments.delete({
      where: {
        id,
      },
    });
  }

  public async update(id: number, data: UpdateCommentDto) {
    return this.client.comments.update({
      where: { id },
      data,
    });
  }
}

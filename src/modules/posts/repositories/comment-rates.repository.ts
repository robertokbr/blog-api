import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateCommentRateDto } from '../dto/create-comment-rate.dto';
import { UpdateCommentRateDto } from '../dto/update-comment-rate.dto';

@Injectable()
export class CommentRatesRepository {
  constructor(private readonly client: PrismaService) {}

  public async create(createCommentRateDto: CreateCommentRateDto) {
    return this.client.commentRates.create({
      data: createCommentRateDto,
    });
  }

  public async findByUserIdAndCommentId(userId: number, commentId: number) {
    return this.client.commentRates.findFirst({
      where: {
        userId,
        commentId,
      },
    });
  }

  public async update(id: number, data: UpdateCommentRateDto) {
    return this.client.commentRates.update({
      where: { id },
      data,
    });
  }

  public async findAllByCommentId(commentId: number) {
    return this.client.commentRates.findMany({
      where: {
        commentId,
      },
    });
  }
}

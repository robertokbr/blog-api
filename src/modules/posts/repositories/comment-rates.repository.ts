import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/common/prisma/prisma.service';
import { CommentRateDto } from '../dto/comment-rate.dto';
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

  public async update(id: number, data: UpdateCommentRateDto) {
    return this.client.commentRates.update({
      where: { id },
      data,
    });
  }

  public async findAll(data: Partial<CommentRateDto>) {
    return this.client.commentRates.findMany({
      where: {
        ...data,
      },
    });
  }
}

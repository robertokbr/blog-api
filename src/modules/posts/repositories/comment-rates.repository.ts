import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCommentRateDto } from '../dto/create-comment-rate.dto';
import { UpdateCommentRateDto } from '../dto/update-comment-rate.dto';

@Injectable()
export class CommentRatesRepository {
  constructor(private readonly client: PrismaClient) {}

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
}

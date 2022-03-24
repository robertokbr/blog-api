import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostRateDto } from '../dto/create-post-rate.dto';
import { UpdatePostRateDto } from '../dto/update-post-rate.dto';

@Injectable()
export class PostRatesRepository {
  constructor(private readonly client: PrismaClient) {}

  public async create(createPostRateDto: CreatePostRateDto) {
    return this.client.postRates.create({
      data: createPostRateDto,
    });
  }

  public async update(id: number, data: UpdatePostRateDto) {
    return this.client.postRates.update({
      where: { id },
      data,
    });
  }
}

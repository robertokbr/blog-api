import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CreatePostRateDto } from '../dto/create-post-rate.dto';
import { UpdatePostRateDto } from '../dto/update-post-rate.dto';

@Injectable()
export class PostRatesRepository {
  constructor(private readonly client: PrismaService) {}

  public async create(createPostRateDto: CreatePostRateDto) {
    return this.client.postRates.create({
      data: createPostRateDto,
    });
  }

  public async findByUserIdAndPostId(userId: number, postId: number) {
    return this.client.postRates.findFirst({
      where: {
        userId,
        postId,
      }
    });
  }

  public async update(id: number, data: UpdatePostRateDto) {
    return this.client.postRates.update({
      where: { id },
      data,
    });
  }
}

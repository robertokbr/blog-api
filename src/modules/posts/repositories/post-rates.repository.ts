import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/common/prisma/prisma.service';
import { CreatePostRateDto } from '../dto/create-post-rate.dto';
import { PostRateDto } from '../dto/post-rate.dto';
import { UpdatePostRateDto } from '../dto/update-post-rate.dto';

@Injectable()
export class PostRatesRepository {
  constructor(private readonly client: PrismaService) {}

  public async create(
    createPostRateDto: CreatePostRateDto,
  ): Promise<PostRateDto> {
    return this.client.postRates.create({
      data: createPostRateDto,
    });
  }

  public async update(
    id: number,
    data: UpdatePostRateDto,
  ): Promise<PostRateDto> {
    return this.client.postRates.update({
      where: { id },
      data,
    });
  }

  public async findAll(data: Partial<PostRateDto>): Promise<PostRateDto[]> {
    return this.client.postRates.findMany({
      where: {
        ...data,
      },
    });
  }
}

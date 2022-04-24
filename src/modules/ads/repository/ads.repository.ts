import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { FindPostByQueryDto } from '../../../modules/posts/dto/find-post-by-query.dto';
import { CreateAdDto } from '../dto/create-ad.dto';
import { UpdateAdDto } from '../dto/update-ad.dto';

@Injectable()
export class AdsRepository {
  constructor(private readonly client: PrismaService) {}

  public async create(createAdDto: CreateAdDto) {
    return this.client.ads.create({
      data: createAdDto,
    });
  }

  public async update(id: number, data: UpdateAdDto) {
    return this.client.ads.update({
      where: { id },
      data,
    });
  }

  public async findOne(id: number) {
    return this.client.ads.findUnique({
      where: { id },
    });
  }

  public async findAll(query: FindPostByQueryDto) {
    return this.client.ads.findMany({
      where: {
        ...query,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/common/prisma/prisma.service';

@Injectable()
export class PostTagsRepository {
  constructor(private readonly client: PrismaService) {}

  public async findAll() {
    return this.client.postTags.findMany();
  }
}

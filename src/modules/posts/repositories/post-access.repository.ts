import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/common/prisma/prisma.service';
import { CreatePostAccessDto } from '../dto/create-post-access.dto';
import { PostAcessDto } from '../dto/post-acess.dto';

@Injectable()
export class PostAccessRepository {
  constructor(private readonly client: PrismaService) {}

  public async create({
    postSlug,
    userId,
  }: CreatePostAccessDto): Promise<PostAcessDto> {
    return this.client.postAccess.create({
      data: {
        postSlug,
        userId,
      },
    });
  }

  public async findAll(data: Partial<PostAcessDto>): Promise<PostAcessDto[]> {
    return this.client.postAccess.findMany({
      where: {
        ...data,
      },
    });
  }
}

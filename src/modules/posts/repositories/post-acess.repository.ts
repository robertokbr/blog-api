import { Injectable } from '@nestjs/common';
import { PostAccess } from '@prisma/client';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Injectable()
export class PostAcessRepository {
  constructor(private readonly client: PrismaService) {}

  public async create({
    postId,
    userId,
  }: Pick<PostAccess, 'postId' | 'userId'>) {
    return this.client.postAccess.create({
      data: {
        postId,
        userId,
      },
    });
  }

  public async findAll() {
    return this.client.postAccess.findMany();
  }
}

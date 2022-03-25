import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostCandidatureDto } from '../dto/create-post-candidature.dto';

@Injectable()
export class PostCandidaturesRepository {
  constructor(private readonly client: PrismaClient) {}

  public async create(createPostCandidatureDto: CreatePostCandidatureDto) {
    return this.client.postCandidatures.create({
      data: createPostCandidatureDto,
    });
  }

  public async update(
    id: number,
    createPostCandidatureDto: CreatePostCandidatureDto,
  ) {
    return this.client.postCandidatures.update({
      where: {
        id,
      },
      data: createPostCandidatureDto,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { CreatePostCandidatureDto } from '../dto/create-post-candidature.dto';

@Injectable()
export class PostCandidaturesRepository {
  constructor(private readonly client: PrismaService) {}

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

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreatePostCandidatureDto } from '../../../../domain/modules/posts/dto/create-post-candidature.dto';
import { IPostCandidaturesRepository } from '../../../../domain/modules/posts/interfaces/post-candidature.repository.interface';
import { PostCandidatureDto } from '../../../../domain/modules/posts/dto/post-candidature.dto';

@Injectable()
export class PostCandidaturesRepository implements IPostCandidaturesRepository {
  constructor(private readonly client: PrismaService) {}

  public async create(
    createPostCandidatureDto: CreatePostCandidatureDto,
  ): Promise<PostCandidatureDto> {
    return this.client.postCandidatures.create({
      data: createPostCandidatureDto,
    }) as Promise<PostCandidatureDto>;
  }

  public async update(
    id: number,
    createPostCandidatureDto: CreatePostCandidatureDto,
  ): Promise<PostCandidatureDto> {
    return this.client.postCandidatures.update({
      where: {
        id,
      },
      data: createPostCandidatureDto,
    }) as Promise<PostCandidatureDto>;
  }
}

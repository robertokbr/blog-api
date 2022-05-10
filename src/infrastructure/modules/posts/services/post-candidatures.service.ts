import { Injectable } from '@nestjs/common';
import { CreatePostCandidatureDto } from '../../../../domain/modules/posts/dto/create-post-candidature.dto';
import { PostCandidatureDto } from '../../../../domain/modules/posts/dto/post-candidature.dto';
import { PostCandidaturesRepository } from '../repositories/post-candidatures.repository';

@Injectable()
export class PostCandidaturesService {
  constructor(
    private readonly postCandidaturesRepository: PostCandidaturesRepository,
  ) {}

  public async createPostCandidature(
    createCandidatureDto: CreatePostCandidatureDto,
  ): Promise<PostCandidatureDto> {
    const postCandidature = await this.postCandidaturesRepository.create(
      createCandidatureDto,
    );

    return postCandidature;
  }

  public async updatePostCandidature(
    postCandidatureId: number,
    createCandidatureDto: CreatePostCandidatureDto,
  ): Promise<PostCandidatureDto> {
    const postCandidature = await this.postCandidaturesRepository.update(
      postCandidatureId,
      createCandidatureDto,
    );

    return postCandidature;
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePostCandidatureDto } from '../dto/create-post-candidature.dto';
import { PostCandidatureDto } from '../dto/post-candidature.dto';
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

    return postCandidature as PostCandidatureDto;
  }

  public async updatePostCandidature(
    postCandidatureId: number,
    createCandidatureDto: CreatePostCandidatureDto,
  ): Promise<PostCandidatureDto> {
    const postCandidature = await this.postCandidaturesRepository.update(
      postCandidatureId,
      createCandidatureDto,
    );

    return postCandidature as PostCandidatureDto;
  }
}

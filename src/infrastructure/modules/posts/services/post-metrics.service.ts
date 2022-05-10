import { Injectable } from '@nestjs/common';
import { PostAccessRepository } from '../repositories/post-access.repository';

@Injectable()
export class PostMetricsService {
  constructor(private readonly postAccessRepository: PostAccessRepository) {}

  public async findAllPostAccess() {
    return this.postAccessRepository.findAll();
  }
}

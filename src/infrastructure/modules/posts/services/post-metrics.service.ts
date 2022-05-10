import { Injectable } from '@nestjs/common';
import { PostAcessRepository } from '../repositories/post-acess.repository';

@Injectable()
export class PostMetricsService {
  constructor(private readonly postAcessRepository: PostAcessRepository) {}

  public async findAllPostAccess() {
    return this.postAcessRepository.findAll();
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostAcessDto } from '../../../../domain/modules/posts/dto/post-acess.dto';
import { PostMetricsService } from '../services/post-metrics.service';

@ApiTags('metrics')
@Controller('posts/metrics')
export class PostsController {
  constructor(private readonly postMetricsService: PostMetricsService) {}

  @ApiResponse({
    type: [PostAcessDto],
  })
  @Get('/access')
  public async findAllPostAccess(): Promise<PostAcessDto[]> {
    return this.postMetricsService.findAllPostAccess();
  }
}

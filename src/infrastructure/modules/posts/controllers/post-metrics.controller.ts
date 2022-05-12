import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostAcessDto } from '../../../../domain/modules/posts/dto/post-acess.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PostMetricsService } from '../services/post-metrics.service';

@ApiTags('metrics')
@Controller('posts/metrics')
export class PostMetricsController {
  constructor(private readonly postMetricsService: PostMetricsService) {}

  @ApiResponse({
    type: [PostAcessDto],
  })
  @Get('/access')
  public async findAllPostAccess(): Promise<PostAcessDto[]> {
    return this.postMetricsService.findAllPostAccess();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/jwt')
  async getUserByJWT(@Request() req: any) {
    return req.user;
  }
}

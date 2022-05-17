import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/domain/modules/users/enums/role.enum';

import { PostAcessDto } from '../../../../domain/modules/posts/dto/post-acess.dto';
import { RequireRole } from '../../common/decorators/require-role.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PostMetricsService } from '../services/post-metrics.service';

@ApiTags('metrics')
@Controller('posts/metrics')
export class PostMetricsController {
  constructor(private readonly postMetricsService: PostMetricsService) {}

  @Get('/access')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @RequireRole(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ type: [PostAcessDto] })
  public async findAllPostAccess(): Promise<PostAcessDto[]> {
    return this.postMetricsService.findAllPostAccess();
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostAdDto } from 'src/domain/modules/ads/dto/create-post-ad.dto';
import { PostAdDto } from '../../../../domain/modules/ads/dto/post-ad.dto';
import { Role } from '../../../../domain/modules/users/enums/role.enum';
import { RequireRole } from '../../../common/decorators/require-role.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { PostAdsService } from '../services/post-ads.service';

@ApiTags('ads')
@Controller('ads/posts')
export class PostAdsController {
  constructor(private readonly postAdsService: PostAdsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @RequireRole(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ type: PostAdDto })
  create(@Body() createPostAdDto: CreatePostAdDto): Promise<PostAdDto> {
    return this.postAdsService.create(createPostAdDto);
  }

  @Get()
  @ApiResponse({ type: [PostAdDto] })
  findAll(): Promise<PostAdDto[]> {
    return this.postAdsService.findAll();
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @RequireRole(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ type: null })
  update(@Param('id') id: string): Promise<void> {
    return this.postAdsService.delete(+id);
  }
}

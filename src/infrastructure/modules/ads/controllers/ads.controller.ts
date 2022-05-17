import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../../../../domain/modules/users/enums/role.enum';
import { AdWithAttributesDto } from '../../../../domain/modules/ads/dto/ad-with-attributes.dto';
import { AdDto } from '../../../../domain/modules/ads/dto/ad.dto';
import { CreateAdDto } from '../../../../domain/modules/ads/dto/create-ad.dto';
import { FindAdsByQueryDto } from '../../../../domain/modules/ads/dto/find-ads-by-query.dto';
import { UpdateAdDto } from '../../../../domain/modules/ads/dto/update-ad.dto';
import { RequireRole } from '../../common/decorators/require-role.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdsService } from '../services/ads.service';

@ApiTags('ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @RequireRole(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ type: AdDto })
  create(@Body() createAdDto: CreateAdDto): Promise<AdWithAttributesDto> {
    return this.adsService.create(createAdDto);
  }

  @Get()
  @ApiResponse({ type: [AdDto] })
  findAll(@Query() findAdsByQueryDto: FindAdsByQueryDto): Promise<AdDto[]> {
    return this.adsService.findAll(findAdsByQueryDto);
  }

  @Get(':id')
  @ApiResponse({ type: AdDto })
  findOne(@Param('id') id: string): Promise<AdWithAttributesDto> {
    return this.adsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @RequireRole(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ type: AdDto })
  update(
    @Param('id') id: string,
    @Body() updateAdDto: UpdateAdDto,
  ): Promise<AdDto> {
    return this.adsService.update(+id, updateAdDto);
  }
}

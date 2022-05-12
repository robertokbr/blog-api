import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdWithAttributesDto } from '../../../../domain/modules/ads/dto/ad-with-attributes.dto';
import { AdDto } from '../../../../domain/modules/ads/dto/ad.dto';
import { CreateAdDto } from '../../../../domain/modules/ads/dto/create-ad.dto';
import { FindAdsByQueryDto } from '../../../../domain/modules/ads/dto/find-ads-by-query.dto';
import { UpdateAdDto } from '../../../../domain/modules/ads/dto/update-ad.dto';
import { AdsService } from '../services/ads.service';

@ApiTags('ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @ApiResponse({
    type: AdDto,
  })
  @Post()
  create(@Body() createAdDto: CreateAdDto): Promise<AdWithAttributesDto> {
    return this.adsService.create(createAdDto);
  }

  @ApiResponse({
    type: [AdDto],
  })
  @Get()
  findAll(@Query() findAdsByQueryDto: FindAdsByQueryDto): Promise<AdDto[]> {
    return this.adsService.findAll(findAdsByQueryDto);
  }

  @ApiResponse({
    type: AdDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<AdWithAttributesDto> {
    return this.adsService.findOne(+id);
  }

  @ApiResponse({
    type: AdDto,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdDto: UpdateAdDto,
  ): Promise<AdDto> {
    return this.adsService.update(+id, updateAdDto);
  }
}

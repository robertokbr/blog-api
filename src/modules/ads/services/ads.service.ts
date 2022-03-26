import { Injectable } from '@nestjs/common';
import { AdDto } from '../dto/ad.dto';
import { CreateAdDto } from '../dto/create-ad.dto';
import { FindAdsByQueryDto } from '../dto/find-ads-by-query.dto';
import { UpdateAdDto } from '../dto/update-ad.dto';
import { AdsRepository } from '../repository/ads.repository';

@Injectable()
export class AdsService {
  constructor(private readonly adsRepository: AdsRepository) {}

  async create(createAdDto: CreateAdDto): Promise<AdDto> {
    const ad = await this.adsRepository.create(createAdDto);

    return ad as AdDto;
  }

  async findAll(findAdsByQueryDto: FindAdsByQueryDto): Promise<AdDto[]> {
    const ad = await this.adsRepository.findAll(findAdsByQueryDto);

    return ad as AdDto[];
  }

  async findOne(id: number): Promise<AdDto> {
    const ad = await this.adsRepository.findOne(id);

    return ad as AdDto;
  }

  async update(id: number, updateAdDto: UpdateAdDto): Promise<AdDto> {
    const ad = await this.adsRepository.update(id, updateAdDto);

    return ad as AdDto;
  }
}

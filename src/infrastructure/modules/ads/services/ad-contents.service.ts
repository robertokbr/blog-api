import { Injectable } from '@nestjs/common';
import { AdContentDto } from 'src/domain/modules/ads/dto/ad-content.dto';
import { CreateAdContentDto } from 'src/domain/modules/ads/dto/create-ad-content.dto';
import { AdContentsRepository } from '../repository/ad-contents.repository';

@Injectable()
export class AdContentsService {
  constructor(private readonly adContentsRepository: AdContentsRepository) {}

  public async create(
    createAdContentDto: CreateAdContentDto,
  ): Promise<AdContentDto> {
    return this.adContentsRepository.create(createAdContentDto);
  }

  public async findAll(): Promise<AdContentDto[]> {
    return this.adContentsRepository.findAll();
  }

  public async delete(id: number): Promise<void> {
    return this.adContentsRepository.delete(id);
  }
}

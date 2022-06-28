import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateAdDto } from '../../../../domain/modules/ads/dto/create-ad.dto';
import { UpdateAdDto } from '../../../../domain/modules/ads/dto/update-ad.dto';
import { AdDto } from '../../../../domain/modules/ads/dto/ad.dto';
import { IAdsRepository } from '../../../../domain/modules/ads/interfaces/ads.repository.interface';
import { AdType } from '../../../../domain/modules/ads/enums/ad-type.enum';

@Injectable()
export class AdsRepository implements IAdsRepository {
  constructor(private readonly client: PrismaService) {}

  public async create(
    createAdDto: CreateAdDto,
    typeAttributesRef?: number,
  ): Promise<AdDto> {
    return this.client.ads.create({
      data: {
        ...createAdDto,
        typeAttributesRef,
      },
    }) as Promise<AdDto>;
  }

  public async update(id: number, data: UpdateAdDto): Promise<AdDto> {
    return this.client.ads.update({
      where: { id },
      data,
    }) as Promise<AdDto>;
  }

  public async findOne(id: number): Promise<AdDto> {
    const ad = await this.client.ads.findUnique({
      where: { id },
    });

    return (ad.isAvailable ? ad : undefined) as AdDto;
  }

  public async findAll(data: Partial<AdDto>): Promise<AdDto[]> {
    return this.client.ads.findMany({
      where: {
        ...data,
        isAvailable: true,
      },
    }) as Promise<AdDto[]>;
  }

  public async findAllByTypeAttributesRefs(
    typeAttributesRefs: number[],
    type: AdType,
  ): Promise<AdDto[]> {
    return this.client.ads.findMany({
      where: {
        type,
        typeAttributesRef: {
          in: typeAttributesRefs,
        },
        isAvailable: true,
      },
    }) as Promise<AdDto[]>;
  }
}

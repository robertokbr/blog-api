import { Injectable } from '@nestjs/common';
import { AdAsideTypeAttributeDto } from '../../../../domain/modules/ads/dto/ad-aside-type-attribute.dto';
import { IAdAsideTypeAttributesRepository } from '../../../../domain/modules/ads/interfaces/ad-post-aside-attributes.respository.interface';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class AdAsideTypeAttributesRepository
  implements IAdAsideTypeAttributesRepository
{
  constructor(private readonly client: PrismaService) {}

  public async create(campaignTime: number): Promise<AdAsideTypeAttributeDto> {
    return this.client.adAsideTypeAttributes.create({
      data: {
        campaignTime,
      },
    });
  }

  public async findOne(id: number): Promise<AdAsideTypeAttributeDto> {
    return this.client.adAsideTypeAttributes.findUnique({
      where: { id },
    });
  }
}

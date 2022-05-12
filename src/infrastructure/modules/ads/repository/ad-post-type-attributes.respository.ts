import { Injectable } from '@nestjs/common';
import { AdPostTypeAttributeDto } from '../../../../domain/modules/ads/dto/ad-post-type-attribute.dto';
import { IAdPostTypeAttributesRepository } from '../../../../domain/modules/ads/interfaces/ad-post-type-attributes.respository.interface';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AdPostTypeAttributesRepository
  implements IAdPostTypeAttributesRepository
{
  constructor(private readonly client: PrismaService) {}

  public async create(frequency: number): Promise<AdPostTypeAttributeDto> {
    return this.client.adPostTypeAttributes.create({
      data: {
        frequency,
      },
    });
  }

  public async findOne(id: number): Promise<AdPostTypeAttributeDto> {
    return this.client.adPostTypeAttributes.findUnique({
      where: { id },
    });
  }
}

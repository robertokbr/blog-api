import { Injectable } from '@nestjs/common';
import { AdCommentTypeAttributeDto } from '../../../../domain/modules/ads/dto/ad-comment-type-attribute.dto';
import { IAdCommentTypeAttributesRepository } from '../../../../domain/modules/ads/interfaces/ad-post-comment-attributes.respository.interface';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class AdCommentTypeAttributesRepository
  implements IAdCommentTypeAttributesRepository
{
  constructor(private readonly client: PrismaService) {}

  public async create(postId: number): Promise<AdCommentTypeAttributeDto> {
    return this.client.adCommentTypeAttributes.create({
      data: {
        postId,
      },
    });
  }

  public async findOne(id: number): Promise<AdCommentTypeAttributeDto> {
    return this.client.adCommentTypeAttributes.findUnique({
      where: { id },
    });
  }
}

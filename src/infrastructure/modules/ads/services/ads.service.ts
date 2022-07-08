import { Injectable } from '@nestjs/common';
import { AdType } from '../../../../domain/modules/ads/enums/ad-type.enum';
import { AdDto } from '../../../../domain/modules/ads/dto/ad.dto';
import { CreateAdDto } from '../../../../domain/modules/ads/dto/create-ad.dto';
import { FindAdsByQueryDto } from '../../../../domain/modules/ads/dto/find-ads-by-query.dto';
import { UpdateAdDto } from '../../../../domain/modules/ads/dto/update-ad.dto';
import { AdAsideTypeAttributesRepository } from '../repository/ad-aside-type-attributes.repository';
import { AdCommentTypeAttributesRepository } from '../repository/ad-comment-type-attributes.repository';
import { AdPostTypeAttributesRepository } from '../repository/ad-post-type-attributes.respository';
import { AdsRepository } from '../repository/ads.repository';
import { AdWithAttributesDto } from '../../../../domain/modules/ads/dto/ad-with-attributes.dto';
import { FindAdsByAttributeDto } from 'src/domain/modules/ads/dto/find-ads-by-attribute.dto';

@Injectable()
export class AdsService {
  constructor(
    private readonly adsRepository: AdsRepository,
    private readonly adCommentTypeAttributesRepository: AdCommentTypeAttributesRepository,
    private readonly adAsideTypeAttributesRepository: AdAsideTypeAttributesRepository,
    private readonly adPostTypeAttributesRepository: AdPostTypeAttributesRepository,
  ) {}

  private getRepositoryByType(type: AdType) {
    const repositoryByType = new Map<AdType, any>([
      [AdType.ASIDE, this.adAsideTypeAttributesRepository],
      [AdType.COMMENT, this.adCommentTypeAttributesRepository],
      [AdType.POST, this.adPostTypeAttributesRepository],
    ]);

    return repositoryByType.get(type);
  }

  async create({
    postId,
    frequency,
    campaignTime,
    ...dto
  }: CreateAdDto): Promise<AdWithAttributesDto> {
    let adAtt: { id: number };

    if (dto.type) {
      const repository = this.getRepositoryByType(dto.type);
      const createAdAttByType = new Map<AdType, () => Promise<{ id: number }>>([
        [AdType.ASIDE, () => repository.create(campaignTime)],
        [AdType.COMMENT, () => repository.create(postId)],
        [AdType.POST, () => repository.create(frequency)],
      ]);
      adAtt = await createAdAttByType.get(dto.type)();
    }

    const ad = await this.adsRepository.create({ ...dto }, adAtt?.id);
    Object.assign(ad, { attributes: adAtt });

    return ad;
  }

  async findAll(findAdsByQueryDto: FindAdsByQueryDto): Promise<AdDto[]> {
    // TODO: add other type cases
    if (findAdsByQueryDto.postId) {
      return this.findAllAdCommentType({
        postId: findAdsByQueryDto.postId,
      });
    }

    const ads = await this.adsRepository.findAll(findAdsByQueryDto);

    ads.map(async (ad) => {
      if (ad.type) {
        const repository = this.getRepositoryByType(ad.type);
        const adAtt = await repository.findOne(ad.typeAttributesRef);
        Object.assign(ad, { attributes: adAtt });
      }
    });

    return ads;
  }

  private async findAllAdCommentType(
    findAdsByAttributeDto: FindAdsByAttributeDto,
  ): Promise<AdDto[]> {
    const atts = await this.adCommentTypeAttributesRepository.findAll({
      postId: findAdsByAttributeDto.postId,
    });

    const postAds = await this.adsRepository.findAllByTypeAttributesRefs(
      atts.map((att) => att.id),
      AdType.COMMENT,
    );

    return postAds;
  }

  async findOne(id: number): Promise<AdWithAttributesDto> {
    const ad: AdWithAttributesDto = await this.adsRepository.findOne(id);

    if (ad.type) {
      const repository = this.getRepositoryByType(ad.type);
      const adAtt = await repository.findOne(ad.typeAttributesRef);
      ad.attributes = adAtt;
    }

    return ad;
  }

  async update(id: number, updateAdDto: UpdateAdDto): Promise<AdDto> {
    const ad = await this.adsRepository.update(id, updateAdDto);

    return ad;
  }
}

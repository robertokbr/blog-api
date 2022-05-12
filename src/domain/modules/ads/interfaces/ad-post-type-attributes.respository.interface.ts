import { CreateEntity, FindOneEntity } from '../../common/base/repository.base';
import { AdPostTypeAttributeDto } from '../dto/ad-post-type-attribute.dto';

export interface IAdPostTypeAttributesRepository
  extends CreateEntity<AdPostTypeAttributeDto, number>,
    FindOneEntity<AdPostTypeAttributeDto, number> {}

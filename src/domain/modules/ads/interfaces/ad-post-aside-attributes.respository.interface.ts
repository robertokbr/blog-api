import { CreateEntity, FindOneEntity } from '../../common/base/repository.base';
import { AdAsideTypeAttributeDto } from '../dto/ad-aside-type-attribute.dto';

export interface IAdAsideTypeAttributesRepository
  extends CreateEntity<AdAsideTypeAttributeDto, number>,
    FindOneEntity<AdAsideTypeAttributeDto, number> {}

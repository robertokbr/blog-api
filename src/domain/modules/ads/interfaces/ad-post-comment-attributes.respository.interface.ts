import {
  CreateEntity,
  FindOneEntity,
} from '../../../common/base/repository.base';
import { AdCommentTypeAttributeDto } from '../dto/ad-comment-type-attribute.dto';

export interface IAdCommentTypeAttributesRepository
  extends CreateEntity<AdCommentTypeAttributeDto, number>,
    FindOneEntity<AdCommentTypeAttributeDto, number> {}

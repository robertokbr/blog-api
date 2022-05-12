import {
  CreateEntity,
  FindAllEntity,
  FindOneEntity,
  UpdateEntity,
} from '../../common/base/repository.base';
import { AdDto } from '../dto/ad.dto';
import { CreateAdDto } from '../dto/create-ad.dto';
import { UpdateAdDto } from '../dto/update-ad.dto';

export interface IAdsRepository
  extends CreateEntity<AdDto, CreateAdDto>,
    UpdateEntity<AdDto, UpdateAdDto>,
    FindAllEntity<AdDto, Partial<AdDto>>,
    FindOneEntity<AdDto, number> {}

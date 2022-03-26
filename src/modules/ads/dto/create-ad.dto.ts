import { OmitType } from '@nestjs/swagger';
import { AdDto } from './ad.dto';

export class CreateAdDto extends OmitType(AdDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

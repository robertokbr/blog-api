import { PartialType } from '@nestjs/swagger';
import { AdDto } from './ad.dto';

export class FindAdsByQueryDto extends PartialType(AdDto) {}

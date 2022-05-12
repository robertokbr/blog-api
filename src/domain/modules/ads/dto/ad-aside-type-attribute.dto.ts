import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { DtoBase } from '../../common/base/dto.base';

export class AdAsideTypeAttributeDto extends DtoBase {
  @IsNumber()
  @ApiProperty()
  campaignTime: number;
}

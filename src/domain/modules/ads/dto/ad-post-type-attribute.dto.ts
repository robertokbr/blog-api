import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { DtoBase } from '../../../common/base/dto.base';

export class AdPostTypeAttributeDto extends DtoBase {
  @IsNumber()
  @ApiProperty()
  frequency: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { DtoBase } from '../../common/base/dto.base';

export class AdCommentTypeAttributeDto extends DtoBase {
  @IsNumber()
  @ApiProperty()
  postId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { DtoBase } from 'src/modules/common/base/dto.base';

export class PostAcessDto extends DtoBase {
  @IsNumber()
  @ApiProperty()
  postId: number;

  @IsNumber()
  @ApiProperty()
  userId: number;
}

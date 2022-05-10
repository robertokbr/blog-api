import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { DtoBase } from 'src/domain/modules/common/base/dto.base';

export class PostAcessDto extends DtoBase {
  @IsString()
  @ApiProperty()
  postSlug: string;

  @IsNumber()
  @ApiProperty()
  userId: number;
}

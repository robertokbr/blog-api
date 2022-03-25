import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DtoBase } from 'src/modules/common/base/dto.base';

export class UserDto extends DtoBase {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty()
  email: string;
}

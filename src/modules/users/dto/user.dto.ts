import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';
import { DtoBase } from 'src/modules/common/dtos/dto.base';

export class UserDto extends DtoBase {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty({ required: false })
  image?: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsEnum(Role)
  @ApiProperty({ enum: Role })
  role: Role;

  @IsString()
  @ApiProperty({ required: false })
  github?: string;
}

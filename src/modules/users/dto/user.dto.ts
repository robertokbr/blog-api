import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DtoBase } from '../../../modules/common/base/dto.base';
import { AccountPermissions } from '../enums/account-permissions.enum';

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

  @IsEnum(AccountPermissions)
  @ApiProperty({ enum: AccountPermissions })
  permission: AccountPermissions;

  @IsString()
  @ApiProperty({ required: false })
  github?: string;
}

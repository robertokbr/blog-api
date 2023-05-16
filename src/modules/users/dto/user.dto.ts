import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';
import { DtoBase } from 'src/modules/common/dtos/dto.base';

interface IGoogleOauthResponse {
  email: string;
  email_verified: string;
  name: string;
  picture: string;
}

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

  static fromGoogleData(data: IGoogleOauthResponse) {
    const user = new UserDto();
    user.email = data.email;
    user.name = data.name;
    user.image = data.picture;
    return user;
  }
}

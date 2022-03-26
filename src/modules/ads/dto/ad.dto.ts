import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { DtoBase } from 'src/modules/common/base/dto.base';
import { AdType } from '../enums/ad-type.enum';

export class AdDto extends DtoBase {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty()
  link: string;

  @IsEnum({ enum: AdType })
  @ApiProperty({ enum: AdType })
  type: AdType;

  @IsBoolean()
  @ApiProperty()
  isAvailable = true;
}

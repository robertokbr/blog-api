import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DtoBase } from '../../common/base/dto.base';
import { AdType } from '../enums/ad-type.enum';

export class AdDto extends DtoBase {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  image?: string;

  @IsString()
  @ApiProperty()
  link: string;

  @IsEnum({ enum: AdType })
  @IsOptional()
  @ApiProperty({ enum: AdType, required: false })
  type?: AdType;

  @IsBoolean()
  @ApiProperty()
  isAvailable = true;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  typeAttributesRef?: number;
}

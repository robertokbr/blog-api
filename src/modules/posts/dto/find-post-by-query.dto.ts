import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PostRateValues } from '../enums/post-rate-values.enum';

export class FindPostByQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  tag?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  userId?: number;

  @IsEnum(PostRateValues)
  @IsOptional()
  @ApiProperty({ required: false })
  rateValue?: PostRateValues;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  input?: string;
}

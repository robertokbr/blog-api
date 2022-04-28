import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}

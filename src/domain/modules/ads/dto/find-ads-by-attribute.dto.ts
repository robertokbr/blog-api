import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class FindAdsByAttributeDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  postId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  campaignTime?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  frequency?: number;
}

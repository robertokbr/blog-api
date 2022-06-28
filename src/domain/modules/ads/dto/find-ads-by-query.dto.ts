import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { AdDto } from './ad.dto';

export class FindAdsByQueryDto extends PartialType(AdDto) {
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

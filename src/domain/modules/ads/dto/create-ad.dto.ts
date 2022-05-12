import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { AdDto } from './ad.dto';

export class CreateAdDto extends OmitType(AdDto, [
  'id',
  'createdAt',
  'updatedAt',
  'typeAttributesRef',
  'isAvailable',
]) {
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

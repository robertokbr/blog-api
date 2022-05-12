import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';
import { AdAsideTypeAttributeDto } from './ad-aside-type-attribute.dto';
import { AdCommentTypeAttributeDto } from './ad-comment-type-attribute.dto';
import { AdPostTypeAttributeDto } from './ad-post-type-attribute.dto';
import { AdDto } from './ad.dto';

export class AdWithAttributesDto extends AdDto {
  @IsObject()
  @IsOptional()
  @ApiProperty({ required: false })
  attributes?:
    | AdAsideTypeAttributeDto
    | AdCommentTypeAttributeDto
    | AdPostTypeAttributeDto;
}

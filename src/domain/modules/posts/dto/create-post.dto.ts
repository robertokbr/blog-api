import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { PostDto } from './post.dto';

export class CreatePostDto extends OmitType(PostDto, [
  'id',
  'createdAt',
  'updatedAt',
  'user',
  'comments',
  'rates',
  'candidatures',
  'tags',
]) {
  @IsArray()
  @IsOptional()
  @ApiProperty()
  tags: string[];
}

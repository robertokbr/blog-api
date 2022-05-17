import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
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
  'slug',
]) {
  @IsArray()
  @IsOptional()
  @ApiProperty()
  tags: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  slug: string;
}

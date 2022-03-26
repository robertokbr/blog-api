import { OmitType } from '@nestjs/swagger';
import { PostDto } from './post.dto';

export class CreatePostDto extends OmitType(PostDto, [
  'id',
  'createdAt',
  'updatedAt',
  'slug',
  'user',
  'comments',
  'rates',
  'candidatures',
]) {}

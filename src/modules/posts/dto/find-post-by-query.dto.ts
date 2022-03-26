import { OmitType, PartialType } from '@nestjs/swagger';
import { PostDto } from './post.dto';

export class FindPostByQueryDto extends PartialType(
  OmitType(PostDto, [
    'id',
    'createdAt',
    'updatedAt',
    'user',
    'comments',
    'rates',
    'candidatures',
  ]),
) {}

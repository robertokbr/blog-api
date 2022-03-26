import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { DtoBase } from 'src/modules/common/base/dto.base';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { CommentDto } from './comment.dto';
import { PostCandidatureDto } from './post-candidature.dto';
import { PostRateDto } from './post-rate.dto';

export class PostDto extends DtoBase {
  @IsString()
  @ApiProperty()
  slug: string;

  @IsString()
  @ApiProperty()
  image?: string;

  @IsString()
  @ApiProperty()
  link?: string;

  @IsNumber()
  @ApiProperty()
  participation?: number;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsNumber()
  @ApiProperty()
  availlablePositions: number;

  @IsString()
  @ApiProperty()
  userId: number;

  // Relations
  @ApiProperty({ type: UserDto })
  user?: UserDto;

  @ApiProperty({ type: [CommentDto] })
  comments?: CommentDto[] = [];

  @ApiProperty({ type: [PostRateDto] })
  rates?: PostRateDto[] = [];

  @ApiProperty({ type: [PostCandidatureDto] })
  candidatures?: PostCandidatureDto[] = [];
}

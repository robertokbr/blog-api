import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { CommentDto } from './comment.dto';
import { PostCandidatureDto } from './post-candidature.dto';
import { PostRateDto } from './post-rate.dto';

export class PostDto {
  @IsNumber()
  @ApiProperty()
  id: number;

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

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;

  // Relations
  @ApiProperty()
  user?: UserDto;

  @ApiProperty()
  comments?: CommentDto[];

  @ApiProperty()
  rates?: PostRateDto[];

  @ApiProperty()
  joiners?: PostCandidatureDto[];
}

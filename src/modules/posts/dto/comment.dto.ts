import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { PostRateDto } from './post-rate.dto';
import { PostDto } from './post.dto';

export class CommentDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @ApiProperty()
  postId: number;

  @IsString()
  @ApiProperty()
  content: string;

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
  post?: PostDto;

  @ApiProperty()
  rates?: PostRateDto[];
}

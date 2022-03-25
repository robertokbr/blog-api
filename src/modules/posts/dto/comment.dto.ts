import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { DtoBase } from 'src/modules/common/base/dto.base';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { PostRateDto } from './post-rate.dto';
import { PostDto } from './post.dto';

export class CommentDto extends DtoBase {
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @ApiProperty()
  postId: number;

  @IsString()
  @ApiProperty()
  content: string;

  // Relations
  @ApiProperty()
  user?: UserDto;

  @ApiProperty()
  post?: PostDto;

  @ApiProperty()
  rates?: PostRateDto[];
}

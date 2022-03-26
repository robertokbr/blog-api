import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { DtoBase } from 'src/modules/common/base/dto.base';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { CommentRateDto } from './comment-rate.dto';

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

  @ApiProperty({ type: UserDto })
  user?: UserDto;

  @ApiProperty({ type: [CommentRateDto] })
  rates?: CommentRateDto[] = [];
}

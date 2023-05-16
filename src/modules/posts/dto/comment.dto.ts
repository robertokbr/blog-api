import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';
import { CommentRateDto } from './comment-rate.dto';
import { DtoBase } from 'src/modules/common/dtos/dto.base';

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
